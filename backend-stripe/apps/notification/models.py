"""
Custom notification models
"""

##########################################################################
## Imports
##########################################################################

from django.db import models
from core.models import User
from django.utils import timezone
from djstripe.models import Event
from subscription.models import SubscriptionMember

##########################################################################
## Notification Trigger
##########################################################################

class NotificationTrigger(models.Model):
    """Notification class for alerting users about various events."""
    #The user that recieves the notification
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notifications")
    #If this notification has been triggered by an event
    processed = models.BooleanField(default=False)
    #Date that the notification was created
    date_created = models.DateTimeField(editable=False)
    #Date that the notification was modified
    date_modified = models.DateTimeField(editable=False)
    #Date that the notification was canceled
    date_canceled = models.DateTimeField(editable=False, null=True, blank=True)
    #The webhook event that triggered this notification
    trigger_event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="notifications", null=True)
    
    
    class Meta:
        abstract = True


##########################################################################
## Email Notification
##########################################################################

class EmailReceiptNotification(NotificationTrigger):
    """Email user the receipt for their new subscription."""
    #The subscription membership attached to this request
    subscription_member = models.OneToOneField(SubscriptionMember, on_delete = models.CASCADE, related_name = "notification")
    
    
    def save(self, *args, **kwargs):
        ''' 
        On save, update timestamps 
        '''
        if not self.id:
            self.date_created = timezone.now()
        self.date_modified = timezone.now()
        return super(EmailNotification, self).save(*args, **kwargs)
        
    class Meta:
        db_table = "Email_Notifications"
        unique_together = (
            'recipient', 
            'subscription_member',
        )
        