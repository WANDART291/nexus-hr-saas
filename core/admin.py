from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, OrganizationTenant, Department, Role, EmployeeProfile

# Register the custom User model
admin.site.register(User, UserAdmin)

@admin.register(OrganizationTenant)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'organization')
    list_filter = ('organization',)

@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ('name', 'organization')
    list_filter = ('organization',)

@admin.register(EmployeeProfile)
class EmployeeProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'organization', 'department', 'role', 'manager')
    list_filter = ('organization', 'department', 'role')
    search_fields = ('user__username', 'user__email')
