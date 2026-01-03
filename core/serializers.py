from rest_framework import serializers
from .models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        # We include 'id' so React knows which employee is which
        fields = ['id', 'first_name', 'last_name', 'email', 'role', 'department', 'is_active']