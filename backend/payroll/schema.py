import graphene
from graphene_django import DjangoObjectType
from .models import PayrollRecord

# 1. Define what a "Paycheck" looks like (Using your REAL model names)
class PayrollRecordType(DjangoObjectType):
    class Meta:
        model = PayrollRecord
        # We list the fields exactly as they appear in your models.py
        fields = ("id", "month", "basic_salary", "tax_deduction", "net_pay", "status", "pay_date")

# 2. Add queries
class Query(graphene.ObjectType):
    all_payroll = graphene.List(PayrollRecordType)

    def resolve_all_payroll(root, info):
        return PayrollRecord.objects.all()