"""
Custom signals for the subscription models
"""

##########################################################################
## Imports
##########################################################################

from django.dispatch import receiver
from django.db.models.signals import post_save, pre_delete, post_delete
from subscription.models import *
from notification.models import EmailReceiptNotification

##########################################################################
## SubscriptionService
##########################################################################

@receiver(post_save, sender=SubscriptionService)
def create_stripe_product(sender, instance, created, **kwargs):
    """Create product for new service"""
    if created:
        instance._init_stripe_product()
        instance.save()

@receiver(pre_delete, sender=SubscriptionService)
def delete_stripe_product(sender, instance, **kwargs):
    """Delete the product from stripe"""
    instance._delete_stripe_product()


##########################################################################
## SubscriptionPlan
##########################################################################

@receiver(post_save, sender=SubscriptionPlan)
def create_stripe_plan(sender, instance, created, **kwargs):
    """Create the plan from stripe"""
    if created:
        instance._init_stripe_plan()
        instance.save()
        
@receiver(pre_delete, sender=SubscriptionPlan)
def delete_stripe_plan(sender, instance, **kwargs):
    """Delete the product from stripe"""
    instance._delete_stripe_plan()


##########################################################################
## SubscriptionMember
##########################################################################

@receiver(post_save, sender=SubscriptionMember)
def create_stripe_subscription_item(sender, instance, created, **kwargs):
    """Create the email notification for emailing receipt"""
    if created:
        emailNotification = EmailReceiptNotification.objects.create(
            recipient = instance.user,
            stripe_subscription_item_id = instance.stripe_subscription_item_id
        )
        
@receiver(pre_delete, sender=SubscriptionMember)
def delete_stripe_subscription_item(sender, instance, **kwargs):
    """Delete the subscription item with stripe"""
    try:
        instance.cancel()
    except:
        pass