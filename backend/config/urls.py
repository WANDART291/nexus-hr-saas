from django.contrib import admin
from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt 
from graphene_django.views import GraphQLView 
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from core import views as core_views
from leave import views as leave_views
from payroll import views as payroll_views

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # REST API (Front Door)
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/employees/', core_views.employee_list, name='employee_list'),
    path('api/leave/', leave_views.leave_list, name='leave_list'),
    path('api/payroll/', payroll_views.payroll_list, name='payroll_list'),
    path('api/performance/', include('performance.urls')),

    # --- NEW GRAPHQL ENDPOINT (Side Door) ---
    # We use csrf_exempt so we can test it easily in the browser
    path("graphql/", csrf_exempt(GraphQLView.as_view(graphiql=True))),
]