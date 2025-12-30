import graphene
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model
from .models import EmployeeProfile, Department, OrganizationTenant, Role

User = get_user_model()

# ===========================================
# 1. TYPES (Reading Data)
# ===========================================

class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ("id", "username", "email", "is_active", "is_staff")

class OrganizationType(DjangoObjectType):
    class Meta:
        model = OrganizationTenant
        fields = ("id", "name")

class DepartmentType(DjangoObjectType):
    class Meta:
        model = Department
        fields = ("id", "name", "organization")

class RoleType(DjangoObjectType):
    class Meta:
        model = Role
        fields = ("id", "name", "organization")

class EmployeeType(DjangoObjectType):
    class Meta:
        model = EmployeeProfile
        fields = ("id", "user", "organization", "department", "role", "manager", "subordinates")

# ===========================================
# 2. QUERIES (Fetching Data)
# ===========================================

class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)
    all_employees = graphene.List(EmployeeType)
    all_organizations = graphene.List(OrganizationType)
    my_profile = graphene.Field(EmployeeType)

    def resolve_all_users(self, info):
        return User.objects.all()

    def resolve_all_employees(self, info):
        # Optimization: select_related fetches connected data in one query
        return EmployeeProfile.objects.select_related('user', 'organization', 'department', 'role').all()

    def resolve_all_organizations(self, info):
        return OrganizationTenant.objects.all()

    def resolve_my_profile(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("Not Logged In")
        return EmployeeProfile.objects.get(user=user)

# ===========================================
# 3. MUTATIONS (Creating & Updating Data)
# ===========================================

class CreateOrganization(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)

    organization = graphene.Field(OrganizationType)

    def mutate(self, info, name):
        org = OrganizationTenant.objects.create(name=name)
        return CreateOrganization(organization=org)

class CreateEmployee(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)
        organization_id = graphene.ID(required=True)

    employee = graphene.Field(EmployeeType)

    def mutate(self, info, username, password, email, organization_id):
        # 1. Get the Org
        org = OrganizationTenant.objects.get(pk=organization_id)
        
        # 2. Create the User
        user = User(username=username, email=email)
        user.set_password(password)
        user.save()

        # 3. Create the Employee Profile linking them
        employee = EmployeeProfile.objects.create(
            user=user,
            organization=org
        )
        
        return CreateEmployee(employee=employee)

class CreateDepartment(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        organization_id = graphene.ID(required=True)

    department = graphene.Field(DepartmentType)

    def mutate(self, info, name, organization_id):
        org = OrganizationTenant.objects.get(pk=organization_id)
        dept = Department.objects.create(name=name, organization=org)
        return CreateDepartment(department=dept)

class CreateRole(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        organization_id = graphene.ID(required=True)

    role = graphene.Field(RoleType)

    def mutate(self, info, name, organization_id):
        org = OrganizationTenant.objects.get(pk=organization_id)
        role_obj = Role.objects.create(name=name, organization=org)
        return CreateRole(role=role_obj)

class UpdateEmployeeProfile(graphene.Mutation):
    class Arguments:
        employee_id = graphene.ID(required=True)
        department_id = graphene.ID(required=True)
        role_id = graphene.ID(required=True)

    employee = graphene.Field(EmployeeType)

    def mutate(self, info, employee_id, department_id, role_id):
        # Fetch objects
        emp = EmployeeProfile.objects.get(pk=employee_id)
        dept = Department.objects.get(pk=department_id)
        role = Role.objects.get(pk=role_id)
        
        # Assign relationships
        emp.department = dept
        emp.role = role
        emp.save()
        
        return UpdateEmployeeProfile(employee=emp)

# ===========================================
# 4. REGISTER MUTATIONS
# ===========================================

class Mutation(graphene.ObjectType):
    create_organization = CreateOrganization.Field()
    create_employee = CreateEmployee.Field()
    create_department = CreateDepartment.Field()
    create_role = CreateRole.Field()
    update_employee_profile = UpdateEmployeeProfile.Field()