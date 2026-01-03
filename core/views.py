from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Employee

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def employee_list(request):
    
    # --- GET: Read the list ---
    if request.method == 'GET':
        employees = Employee.objects.all()
        data = []
        for emp in employees:
            data.append({
                "id": emp.id,
                "first_name": emp.first_name,
                "last_name": emp.last_name,
                "email": emp.email,
                "role": emp.role,
                "department": emp.department,
                "is_active": emp.is_active
            })
        return Response(data)

    # --- POST: Create a new employee ---
    elif request.method == 'POST':
        try:
            data = request.data
            
            # 1. Validation: Check required fields
            required_fields = ['first_name', 'last_name', 'email', 'role', 'department']
            for field in required_fields:
                if field not in data:
                    return Response({"detail": f"Missing field: {field}"}, status=400)

            # 2. Validation: Check if email is already taken
            if Employee.objects.filter(email=data.get('email')).exists():
                return Response({"detail": "An employee with this email already exists."}, status=400)

            # 3. Create the record
            Employee.objects.create(
                first_name=data['first_name'],
                last_name=data['last_name'],
                email=data['email'],
                role=data['role'],
                department=data['department']
            )
            
            return Response({"message": "Employee created successfully!"}, status=201)

        except Exception as e:
            # This is the Safety Net: If anything crashes, tell us WHY.
            print(f"SERVER ERROR: {str(e)}") # Print to terminal
            return Response({"detail": str(e)}, status=500) # Send error to Frontend