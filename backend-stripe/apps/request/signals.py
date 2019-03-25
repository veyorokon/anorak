from django.dispatch import receiver
from django.db.models.signals import post_save
from subscription.models import SubscriptionMember
from request.models import *
from . enum import *

#Create a new management request on subscription account save
@receiver(post_save, sender=SubscriptionMember)
def create_account_management_request(sender, instance, created, **kwargs):
    if created:
        ManagementRequest.objects.create(
            subscription_account = instance.subscription_account,
            subscription_member = instance,
            originator = ManagementRequestOriginator.SERVER,
        )

#Connect account request generate