import graphene
from graphene_django import DjangoObjectType
from .models import LeaveType, LeaveBalance, LeaveRequest
from core.models import EmployeeProfile, OrganizationTenant
from audit.models import AuditLog  # <--- NEW IMPORT
from datetime import datetime

# ===========================================
# 1. TYPES
# ===========================================

class LeaveTypeType(DjangoObjectType):
    class Meta:
        model = LeaveType
        fields = "__all__"

class LeaveBalanceType(DjangoObjectType):
    # Fix: Explicitly define balance as Float to handle Decimal conversion
    balance = graphene.Float()

    class Meta:
        model = LeaveBalance
        fields = "__all__"

    # Fix: Resolver to convert Decimal('15.0') -> Float(15.0)
    def resolve_balance(root, info):
        return float(root.balance)

class LeaveRequestType(DjangoObjectType):
    class Meta:
        model = LeaveRequest
        fields = "__all__"

# ===========================================
# 2. QUERY
# ===========================================

class Query(graphene.ObjectType):
    all_leave_types = graphene.List(LeaveTypeType)
    my_leave_balances = graphene.List(LeaveBalanceType)
    my_leave_requests = graphene.List(LeaveRequestType)

    def resolve_all_leave_types(self, info):
        # In a real app, filter by the user's organization!
        return LeaveType.objects.all()

    def resolve_my_leave_balances(self, info):
        user = info.context.user
        if user.is_anonymous:
            return LeaveBalance.objects.none()
        return LeaveBalance.objects.filter(employee__user=user)

    def resolve_my_leave_requests(self, info):
        user = info.context.user
        if user.is_anonymous:
            return LeaveRequest.objects.none()
        return LeaveRequest.objects.filter(employee__user=user)

# ===========================================
# 3. MUTATIONS
# ===========================================

class CreateLeaveType(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        days_allowed = graphene.Int(required=True)
        organization_id = graphene.ID(required=True)

    leave_type = graphene.Field(LeaveTypeType)

    def mutate(self, info, name, days_allowed, organization_id):
        org = OrganizationTenant.objects.get(pk=organization_id)
        lt = LeaveType.objects.create(name=name, days_allowed=days_allowed, organization=org)
        return CreateLeaveType(leave_type=lt)

class AssignLeaveBalance(graphene.Mutation):
    class Arguments:
        employee_id = graphene.ID(required=True)
        leave_type_id = graphene.ID(required=True)
        balance = graphene.Float(required=True)

    leave_balance = graphene.Field(LeaveBalanceType)

    def mutate(self, info, employee_id, leave_type_id, balance):
        emp = EmployeeProfile.objects.get(pk=employee_id)
        lt = LeaveType.objects.get(pk=leave_type_id)
        
        # Check if balance already exists, update it if so
        lb, created = LeaveBalance.objects.get_or_create(
            employee=emp, 
            leave_type=lt,
            defaults={'balance': balance}
        )
        if not created:
            lb.balance = balance
            lb.save()
            
        return AssignLeaveBalance(leave_balance=lb)

class ApplyForLeave(graphene.Mutation):
    class Arguments:
        leave_type_id = graphene.ID(required=True)
        start_date = graphene.Date(required=True)
        end_date = graphene.Date(required=True)
        reason = graphene.String()

    leave_request = graphene.Field(LeaveRequestType)
    success = graphene.Boolean()
    message = graphene.String()

    def mutate(self, info, leave_type_id, start_date, end_date, reason=""):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("You must be logged in to apply for leave.")

        # 1. Get Employee Profile
        employee = EmployeeProfile.objects.get(user=user)
        leave_type = LeaveType.objects.get(pk=leave_type_id)

        # 2. Calculate Days Requested
        delta = end_date - start_date
        days_requested = delta.days + 1 # +1 to include the start day

        if days_requested <= 0:
            raise Exception("End date must be after start date")

        # 3. Check Balance (Business Logic)
        try:
            balance_record = LeaveBalance.objects.get(employee=employee, leave_type=leave_type)
        except LeaveBalance.DoesNotExist:
            raise Exception("You have no balance assigned for this leave type.")

        if balance_record.balance < days_requested:
            raise Exception(f"Insufficient funds! You have {balance_record.balance} days but requested {days_requested}.")

        # 4. Create Request (If logic passes)
        req = LeaveRequest.objects.create(
            employee=employee,
            leave_type=leave_type,
            start_date=start_date,
            end_date=end_date,
            reason=reason,
            status='PENDING'
        )

        return ApplyForLeave(leave_request=req, success=True, message="Application Submitted")

class ApproveLeaveRequest(graphene.Mutation):
    class Arguments:
        request_id = graphene.ID(required=True)
        action = graphene.String(required=True) # "APPROVE" or "REJECT"

    success = graphene.Boolean()
    message = graphene.String()

    def mutate(self, info, request_id, action):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("Not authorized")
            
        # 1. Get the Request
        req = LeaveRequest.objects.get(pk=request_id)
        
        if req.status != 'PENDING':
            raise Exception("This request has already been processed.")

        # 2. Handle Rejection
        if action == "REJECT":
            req.status = 'REJECTED'
            req.save()
            
            # --- AUDIT LOGGING START ---
            AuditLog.objects.create(
                actor=user,
                action="REJECTED",
                target_model="LeaveRequest",
                target_id=req.id,
                details=f"Leave rejected for {req.employee.user.username}"
            )
            # --- AUDIT LOGGING END ---

            return ApproveLeaveRequest(success=True, message="Request Rejected")

        # 3. Handle Approval (The Critical Logic)
        elif action == "APPROVE":
            # Recalculate days to be safe
            delta = req.end_date - req.start_date
            days_to_deduct = delta.days + 1
            
            # Get Balance
            balance_record = LeaveBalance.objects.get(
                employee=req.employee, 
                leave_type=req.leave_type
            )
            
            # Deduct and Save
            balance_record.balance -= days_to_deduct
            balance_record.save()
            
            req.status = 'APPROVED'
            req.save()
            
            # --- AUDIT LOGGING START ---
            AuditLog.objects.create(
                actor=user,
                action="APPROVED",
                target_model="LeaveRequest",
                target_id=req.id,
                details=f"Approved {days_to_deduct} days for {req.employee.user.username}"
            )
            # --- AUDIT LOGGING END ---
            
            return ApproveLeaveRequest(success=True, message=f"Approved. {days_to_deduct} days deducted.")
            
        else:
            raise Exception("Invalid Action. Use APPROVE or REJECT")

class Mutation(graphene.ObjectType):
    create_leave_type = CreateLeaveType.Field()
    assign_leave_balance = AssignLeaveBalance.Field()
    apply_for_leave = ApplyForLeave.Field()
    approve_leave_request = ApproveLeaveRequest.Field()