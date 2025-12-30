from django.db import models
from core.models import EmployeeProfile

class PerformanceGoal(models.Model):
    employee = models.ForeignKey(EmployeeProfile, on_delete=models.CASCADE)
    title = models.CharField(max_length=200) # e.g. "Increase Sales by 10%"
    description = models.TextField()
    due_date = models.DateField()
    is_completed = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.employee.user.username})"

class PerformanceReview(models.Model):
    employee = models.ForeignKey(EmployeeProfile, on_delete=models.CASCADE, related_name="reviews_received")
    reviewer = models.ForeignKey(EmployeeProfile, on_delete=models.SET_NULL, null=True, related_name="reviews_given")
    
    review_period = models.CharField(max_length=100) # e.g. "Q4 2025"
    score = models.IntegerField() # 1 to 5
    feedback = models.TextField()
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.employee.user.username} - {self.review_period} - {self.score}/5"
