from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import PayrollRecord
from core.models import Employee
import datetime

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def payroll_list(request):  # <--- This is the missing function!
    
    # --- GET: Show History ---
    if request.method == 'GET':
        records = PayrollRecord.objects.all().order_by('-pay_date')
        data = []
        for r in records:
            data.append({
                "id": r.id,
                "employee": f"{r.employee.first_name} {r.employee.last_name}",
                "month": r.month,
                "basic": r.basic_salary,
                "tax": r.tax_deduction,
                "net": r.net_pay,
                "status": r.status,
                "date": r.pay_date
            })
        return Response(data)

    # --- POST: RUN PAYROLL ---
    elif request.method == 'POST':
        today = datetime.date.today()
        current_month = today.strftime("%B %Y")
        
        if PayrollRecord.objects.filter(month=current_month).exists():
            return Response({"error": f"Payroll for {current_month} has already been run!"}, status=400)

        employees = Employee.objects.filter(is_active=True)
        created_count = 0
        
        for emp in employees:
            base_salary = 50000 
            tax = base_salary * 0.20
            net = base_salary - tax

            PayrollRecord.objects.create(
                employee=emp,
                month=current_month,
                basic_salary=base_salary,
                tax_deduction=tax,
                net_pay=net,
                status='Paid'
            )
            created_count += 1

        return Response({"message": f"Successfully ran payroll for {created_count} employees!"})
