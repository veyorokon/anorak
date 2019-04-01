from django.dispatch import receiver
from django.db.models.signals import post_save
from subscription.models import ConnectAccount, CreateAccount
from request.models import *
from request.enum import ManagementRequestAction
from subscription.enum import SubscriptionAccountType

#Create a new management request on subscription account save
@receiver(post_save, sender=ConnectAccount)
@receiver(post_save, sender=CreateAccount)
def create_account_management_request(sender, instance, created, **kwargs):
    if created:
        requestedAction = ManagementRequestAction.CREATE_ACCOUNT
        if instance.type == SubscriptionAccountType.CONNECT:
            requestedAction = ManagementRequestAction.CONNECT_ACCOUNT
        ManagementRequest.objects.create(
            subscription_account = instance,
            requested_by = instance.responsible_user,
            originator = ManagementRequestOriginator.SERVER,
            requested_action = requestedAction
        )


