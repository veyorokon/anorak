from django.db import models
from core.models import User
from subscription.models import SubscriptionMember, SubscriptionAccount
from django.utils import timezone
from . enum import *

#Manual actions (in future API) needed to be performed on the actual subscription account.
class ManagementRequest(models.Model):
    #The subscription account attached to this request
    subscription_account = models.ForeignKey(SubscriptionAccount, on_delete=models.CASCADE, related_name="management_requests")
    #The subscription membership attached to this request
    subscription_member = models.ForeignKey(SubscriptionMember, on_delete=models.CASCADE, related_name="management_requests", null=True, blank=True)
    #The originator of the request
    originator = enum.EnumField(ManagementRequestOriginator, default=ManagementRequestOriginator.CLIENT)
    #Date that the processing request was created
    date_created = models.DateTimeField(editable=False)
    #Date that the request was processed
    date_processed = models.DateTimeField(editable=False, null=True, blank=True)
    #Who this request was created by
    processed_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="management_requests_processed", editable=False, null=True, blank=True)
    #The status of the user subscription 
    status = enum.EnumField(ManagementRequestStatus, default=ManagementRequestStatus.PROCESSING)
    #The action requested on the account
    requested_action = enum.EnumField(ManagementRequestAction, default=ManagementRequestAction.CREATE_ACCOUNT)
    #Any specific notes by the person who processed the action.
    processed_notes = models.CharField(max_length=128, blank=True, null=True)
    
    def save(self, *args, **kwargs):
        ''' 
        On save, update timestamps 
        '''
        if not self.id:
            self.date_created = timezone.now()
        return super(ManagementRequest, self).save(*args, **kwargs)