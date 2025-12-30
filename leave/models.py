from django.db import models
from core.models import OrganizationTenant, EmployeeProfile

class LeaveType(models.Model):
    name = models.CharField(max_length=100)
    organization = models.ForeignKey(OrganizationTenant, on_delete=models.CASCADE)
    days_allowed = models.IntegerField(default=21)
    
    def __str__(self):
        return self.name

class LeaveBalance(models.Model):
    employee = models.ForeignKey(EmployeeProfile, on_delete=models.CASCADE)
    leave_type = models.ForeignKey(LeaveType, on_delete=models.CASCADE)
    balance = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)

    def __str__(self):
        return f"{self.employee} - {self.leave_type}"

class LeaveRequest(models.Model):
    STATUS_CHOICES = (('PENDING', 'Pending'), ('APPROVED', 'Approved'), ('REJECTED', 'Rejected'))
    
    employee = models.ForeignKey(EmployeeProfile, on_delete=models.CASCADE)
    leave_type = models.ForeignKey(LeaveType, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    reason = models.TextField(blank=True)
