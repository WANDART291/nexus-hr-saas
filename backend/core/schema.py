import graphene
from graphene_django import DjangoObjectType
from .models import Employee

# --- 1. The Employee Type (Read) ---
class EmployeeType(DjangoObjectType):
    class Meta:
        model = Employee
        fields = ("id", "first_name", "last_name", "email", "department", "role", "is_active")

    # Link to Payroll (Reverse Lookup)
    payroll_history = graphene.List("payroll.schema.PayrollRecordType")

    def resolve_payroll_history(self, info):
        return self.payrollrecord_set.all()

# --- 2. The Create Mutation (Write) ---
class CreateEmployee(graphene.Mutation):
    # The output of this mutation (what sends back to the frontend)
    employee = graphene.Field(EmployeeType)

    # The inputs (arguments) required to create an employee
    class Arguments:
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        email = graphene.String(required=True)
        department = graphene.String(required=True)
        role = graphene.String(required=True)

    # The Logic (Save to DB)
    def mutate(self, info, first_name, last_name, email, department, role):
        employee = Employee(
            first_name=first_name,
            last_name=last_name,
            email=email,
            department=department,
            role=role,
            is_active=True
        )
        employee.save()
        return CreateEmployee(employee=employee)

# --- 3. The Query Class (Read Operations) ---
class Query(graphene.ObjectType):
    all_employees = graphene.List(EmployeeType)
    employee_by_id = graphene.Field(EmployeeType, id=graphene.Int())

    def resolve_all_employees(root, info):
        return Employee.objects.all()

    def resolve_employee_by_id(root, info, id):
        try:
            return Employee.objects.get(pk=id)
        except Employee.DoesNotExist:
            return None

# --- 4. The Mutation Class (Write Operations) ---
class Mutation(graphene.ObjectType):
    create_employee = CreateEmployee.Field()

    