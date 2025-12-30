import graphene
from graphene_django import DjangoObjectType
from .models import SalaryStructure, Payslip
from core.models import EmployeeProfile
from datetime import date

# ===========================================
# 1. TYPES (With Decimal Fixes)
# ===========================================

class SalaryStructureType(DjangoObjectType):
    # Fix: Explicitly define money fields as Float
    basic_salary = graphene.Float()
    allowances = graphene.Float()
    deductions = graphene.Float()

    class Meta:
        model = SalaryStructure
        fields = "__all__"

    # Resolvers to convert Decimal -> Float
    def resolve_basic_salary(root, info):
        return float(root.basic_salary)

    def resolve_allowances(root, info):
        return float(root.allowances)

    def resolve_deductions(root, info):
        return float(root.deductions)

class PayslipType(DjangoObjectType):
    # Fix: Explicitly define money fields as Float
    basic_salary = graphene.Float()
    total_allowances = graphene.Float()
    total_deductions = graphene.Float()
    net_pay = graphene.Float()

    class Meta:
        model = Payslip
        fields = "__all__"

    # Resolvers to convert Decimal -> Float
    def resolve_basic_salary(root, info):
        return float(root.basic_salary)

    def resolve_total_allowances(root, info):
        return float(root.total_allowances)

    def resolve_total_deductions(root, info):
        return float(root.total_deductions)

    def resolve_net_pay(root, info):
        return float(root.net_pay)

# ===========================================
# 2. QUERY
# ===========================================

class Query(graphene.ObjectType):
    my_payslips = graphene.List(PayslipType)
    employee_salary_structure = graphene.Field(SalaryStructureType, employee_id=graphene.ID(required=True))

    def resolve_my_payslips(self, info):
        user = info.context.user
        if user.is_anonymous:
            return Payslip.objects.none()
        return Payslip.objects.filter(employee__user=user)

    def resolve_employee_salary_structure(self, info, employee_id):
        return SalaryStructure.objects.get(employee__id=employee_id)

# ===========================================
# 3. MUTATIONS
# ===========================================

class CreateSalaryStructure(graphene.Mutation):
    class Arguments:
        employee_id = graphene.ID(required=True)
        basic_salary = graphene.Float(required=True)
        allowances = graphene.Float(required=True)
        deductions = graphene.Float(required=True)

    salary_structure = graphene.Field(SalaryStructureType)

    def mutate(self, info, employee_id, basic_salary, allowances, deductions):
        emp = EmployeeProfile.objects.get(pk=employee_id)
        
        # Create or Update the structure
        structure, created = SalaryStructure.objects.update_or_create(
            employee=emp,
            defaults={
                'basic_salary': basic_salary,
                'allowances': allowances,
                'deductions': deductions
            }
        )
        return CreateSalaryStructure(salary_structure=structure)

class ProcessPayroll(graphene.Mutation):
    class Arguments:
        employee_id = graphene.ID(required=True)
        month = graphene.String(required=True) # e.g., "December"
        year = graphene.Int(required=True)     # e.g., 2025

    payslip = graphene.Field(PayslipType)
    success = graphene.Boolean()

    def mutate(self, info, employee_id, month, year):
        # 1. Get Employee & Structure
        emp = EmployeeProfile.objects.get(pk=employee_id)
        try:
            struct = SalaryStructure.objects.get(employee=emp)
        except SalaryStructure.DoesNotExist:
            raise Exception("No Salary Structure defined for this employee!")

        # 2. Calculate Net Pay (Simple Logic)
        # Net = (Basic + Allowances) - Deductions
        gross = float(struct.basic_salary) + float(struct.allowances)
        deduct = float(struct.deductions)
        net_pay = gross - deduct

        # 3. Create Payslip
        slip = Payslip.objects.create(
            employee=emp,
            month=month,
            year=year,
            basic_salary=struct.basic_salary,
            total_allowances=struct.allowances,
            total_deductions=struct.deductions,
            net_pay=net_pay,
            payment_date=date.today()
        )

        return ProcessPayroll(payslip=slip, success=True)

class Mutation(graphene.ObjectType):
    create_salary_structure = CreateSalaryStructure.Field()
    process_payroll = ProcessPayroll.Field()