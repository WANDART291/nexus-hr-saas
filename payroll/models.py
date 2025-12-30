from django.db import models
from core.models import EmployeeProfile

class SalaryStructure(models.Model):
    employee = models.OneToOneField(EmployeeProfile, on_delete=models.CASCADE)
    basic_salary = models.DecimalField(max_digits=10, decimal_places=2)
    allowances = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    deductions = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return f"Salary for {self.employee.user.username}"

class Payslip(models.Model):
    employee = models.ForeignKey(EmployeeProfile, on_delete=models.CASCADE)
    month = models.CharField(max_length=20) # e.g. "December"
    year = models.IntegerField()            # e.g. 2025
    
    # Snapshot of the money at that specific time
    basic_salary = models.DecimalField(max_digits=10, decimal_places=2)
    total_allowances = models.DecimalField(max_digits=10, decimal_places=2)
    total_deductions = models.DecimalField(max_digits=10, decimal_places=2)
    net_pay = models.DecimalField(max_digits=10, decimal_places=2)
    
    payment_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.employee.user.username} - {self.month} {self.year}"
