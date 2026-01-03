from django.db import models
from core.models import Employee

class PayrollRecord(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    pay_date = models.DateField(auto_now_add=True)
    month = models.CharField(max_length=20) # e.g., "January 2026"
    
    # Financials (Using Decimal for money is standard practice)
    basic_salary = models.DecimalField(max_digits=10, decimal_places=2)
    tax_deduction = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    net_pay = models.DecimalField(max_digits=10, decimal_places=2)
    
    status = models.CharField(
        max_length=20, 
        choices=[('Pending', 'Pending'), ('Paid', 'Paid')],
        default='Pending'
    )

    def __str__(self):
        return f"{self.employee} - {self.month}"