from rest_framework import viewsets, permissions
from .models import PerformanceReview
from .serializers import PerformanceReviewSerializer
from core.models import Employee

class PerformanceReviewViewSet(viewsets.ModelViewSet):
    serializer_class = PerformanceReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # If user is admin/manager, show all reviews (or filter by department logic later)
        if user.is_staff or user.is_superuser:
            return PerformanceReview.objects.all()
        
        # If normal employee, ONLY show reviews about THEM
        try:
            employee = Employee.objects.get(user=user)
            return PerformanceReview.objects.filter(employee=employee)
        except Employee.DoesNotExist:
            return PerformanceReview.objects.none()

    def perform_create(self, serializer):
        # Automatically set the "Reviewer" to the person currently logged in
        serializer.save(reviewer=self.request.user)
