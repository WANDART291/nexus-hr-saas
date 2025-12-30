from django.db import models
from core.models import User

class AuditLog(models.Model):
    actor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True) # Who did it?
    action = models.CharField(max_length=50)       # What did they do? (e.g. "CREATE", "DELETE")
    target_model = models.CharField(max_length=50) # Which table? (e.g. "LeaveRequest")
    target_id = models.CharField(max_length=50)    # Which specific row ID?
    details = models.TextField(blank=True)         # Extra info (JSON or text)
    
    timestamp = models.DateTimeField(auto_now_add=True) # When?

    def __str__(self):
        return f"{self.actor} - {self.action} - {self.timestamp}"
