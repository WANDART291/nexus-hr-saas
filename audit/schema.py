import graphene
from graphene_django import DjangoObjectType
from .models import AuditLog

class AuditLogType(DjangoObjectType):
    class Meta:
        model = AuditLog
        fields = "__all__"

class Query(graphene.ObjectType):
    all_audit_logs = graphene.List(AuditLogType)

    def resolve_all_audit_logs(self, info):
        # Security: Only admins should see logs
        user = info.context.user
        if not user.is_staff:
            raise Exception("Not authorized to view audit logs")
        return AuditLog.objects.all().order_by('-timestamp')

# We don't usually create Audit Logs manually via API. 
# They are created automatically by the system (Signals).
# So we don't need a Mutation class here.