from django.db import models
from core.models import Employee

class PerformanceReview(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    review_date = models.DateField()
    score = models.DecimalField(max_digits=3, decimal_places=1) # e.g. 4.5
    feedback = models.TextField()

    def __str__(self):
        return f"{self.employee} - {self.score}"

class Goal(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    assigned_to = models.ManyToManyField(Employee) # Goals can be for multiple people
    due_date = models.DateField()
    progress = models.IntegerField(default=0) # 0 to 100

    def __str__(self):
        return self.title
