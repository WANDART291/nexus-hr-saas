from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import LeaveRequest
from core.models import Employee # Import Employee to link the user

@api_view(['GET', 'POST']) # <--- Now allows POST requests
@permission_classes([IsAuthenticated])
def leave_list(request):
    
    # --- GET: Fetch all requests ---
    if request.method == 'GET':
        leaves = LeaveRequest.objects.all().order_by('-start_date')
        data = []
        for l in leaves:
            emp_name = f"{l.employee.first_name} {l.employee.last_name}" if l.employee else "Unknown"
            data.append({
                "id": l.id,
                "employee": emp_name,
                "type": l.leave_type,
                "start_date": l.start_date,
                "end_date": l.end_date,
                "days": (l.end_date - l.start_date).days if l.end_date and l.start_date else 0,
                "status": l.status,
            })
        return Response(data)

    # --- POST: Create a new request ---
    elif request.method == 'POST':
        data = request.data
        try:
            # 1. Find the Employee profile linked to this User
            employee = Employee.objects.get(user=request.user)
            
            # 2. Create the Leave Request
            LeaveRequest.objects.create(
                employee=employee,
                leave_type=data['leave_type'],
                start_date=data['start_date'],
                end_date=data['end_date'],
                reason=data.get('reason', ''),
                status='Pending'
            )
            return Response({"message": "Leave request created successfully!"}, status=201)
            
        except Employee.DoesNotExist:
            return Response({"error": "Current user is not linked to an Employee profile."}, status=400)
        except Exception as e:
            return Response({"error": str(e)}, status=400)
