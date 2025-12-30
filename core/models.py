from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    # We extend the default user
    email = models.EmailField(unique=True)  # Enforce unique emails

class OrganizationTenant(models.Model):
    name = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Department(models.Model):
    name = models.CharField(max_length=255)
    organization = models.ForeignKey(OrganizationTenant, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Role(models.Model):
    name = models.CharField(max_length=100)
    organization = models.ForeignKey(OrganizationTenant, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class EmployeeProfile(models.Model):
    # Added related_name='employee_profile' for easier GraphQL lookups
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='employee_profile')
    organization = models.ForeignKey(OrganizationTenant, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True)
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True, blank=True)
    
    # Self-referencing FK for Manager
    manager = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='subordinates')

    def __str__(self):
        return self.user.username