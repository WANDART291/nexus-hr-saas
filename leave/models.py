from django.db import models
from core.models import Employee

class LeaveRequest(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    leave_type = models.CharField(max_length=50) # e.g., Annual, Sick
    start_date = models.DateField()
    end_date = models.DateField()
    reason = models.TextField(blank=True)
    status = models.CharField(max_length=20, default='Pending') # Pending, Approved, Rejected

    def __str__(self):
        return f"{self.employee} - {self.leave_type}"