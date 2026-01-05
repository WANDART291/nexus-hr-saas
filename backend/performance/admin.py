from django.contrib import admin
from .models import PerformanceReview

@admin.register(PerformanceReview)
class PerformanceReviewAdmin(admin.ModelAdmin):
    list_display = ('title', 'employee', 'rating', 'reviewer', 'date_created')
    list_filter = ('rating', 'date_created')
    search_fields = ('title', 'employee__user__first_name', 'employee__user__last_name', 'feedback')
    readonly_fields = ('date_created', 'reviewer')
