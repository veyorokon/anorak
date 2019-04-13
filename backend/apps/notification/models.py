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
from backend.email import EmailManager
from backend.utility import get_current_epoch

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
    date_created = models.IntegerField(editable=False)
    #Date that the notification was modified
    date_modified = models.IntegerField(editable=False)
    #Date that the notification was canceled
    date_notified = models.IntegerField(editable=False, null=True, blank=True)
    #The webhook event that triggered this notification
    trigger_event = models.ForeignKey(Event, on_delete=models.SET_NULL, related_name="notifications", null=True)


    class Meta:
        abstract = True


##########################################################################
## Email Notification
##########################################################################

class EmailReceiptNotification(NotificationTrigger):
    """Email user the receipt for their new subscription."""
    #The stripe subscription item id
    stripe_subscription_item_id = models.CharField(max_length=32, null=True)
    #The stripe subscription item id
    stripe_invoice_item_id = models.CharField(max_length=32, null=True)

    @property
    def djstripe_event_id(self):
        id = None
        try:
            id = self.trigger_event.id
        except:
            pass
        return id

    def _email_recipient(self, invoiceItem, invoice):
        emailManager = EmailManager(self.recipient, invoice)
        emailManager.email_receipt(invoiceItem)

    def process(self, event, invoiceItem, invoice):
        self.trigger_event = event
        self.date_notified = get_current_epoch()
        self.processed = True
        self.stripe_invoice_item_id = invoiceItem.id
        self._email_recipient(invoiceItem, invoice)
        self.save()


    def save(self, *args, **kwargs):
        '''
        On save, update timestamps
        '''
        if not self.id:
            self.date_created = get_current_epoch()
        self.date_modified = get_current_epoch()
        return super(EmailReceiptNotification, self).save(*args, **kwargs)

    class Meta:
        db_table = "Email_Notifications"
