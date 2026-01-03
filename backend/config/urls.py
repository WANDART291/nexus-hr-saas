from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from core import views as core_views
from leave import views as leave_views
from payroll import views as payroll_views

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Auth
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Core (THIS WAS THE BROKEN LINE)
    # We changed 'get_employees' to 'employee_list' to match your views.py
    path('api/employees/', core_views.employee_list, name='employee_list'),

    # Leave
    path('api/leave/', leave_views.leave_list, name='leave_list'),
    
    # Payroll
    path('api/payroll/', payroll_views.payroll_list, name='payroll_list'),
]