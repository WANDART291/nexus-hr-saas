from django.db import models
from core.models import Employee  # We link reviews to the Employee profile

class PerformanceReview(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='reviews')
    reviewer = models.ForeignKey('core.User', on_delete=models.SET_NULL, null=True, related_name='given_reviews')
    title = models.CharField(max_length=100)  # e.g., "Q1 Review"
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])  # Score 1-5
    feedback = models.TextField()
    goals = models.TextField(blank=True, null=True)  # Goals for next time
    date_created = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.employee}"
