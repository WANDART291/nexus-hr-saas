from django.db import models
from django.conf import settings # <--- 1. We need this import
from django.contrib.auth.models import AbstractUser

# 1. Keep the User model
class User(AbstractUser):
    email = models.EmailField(unique=True)

# 2. The Employee Model (Updated with Link)
class Employee(models.Model):
    # <--- 2. THIS IS THE MISSING PIECE --->
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        null=True, 
        blank=True
    )
    # <------------------------------------>

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=100)       
    department = models.CharField(max_length=100) 
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"