from rest_framework import serializers
from .models import PerformanceReview

class PerformanceReviewSerializer(serializers.ModelSerializer):
    employee_name = serializers.ReadOnlyField(source='employee.user.get_full_name')
    reviewer_name = serializers.ReadOnlyField(source='reviewer.get_full_name')

    class Meta:
        model = PerformanceReview
        fields = ['id', 'employee', 'employee_name', 'reviewer', 'reviewer_name', 'title', 'rating', 'feedback', 'goals', 'date_created']
        read_only_fields = ['reviewer', 'date_created']