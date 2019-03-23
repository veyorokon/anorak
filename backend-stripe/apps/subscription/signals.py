"""
Custom signals for the subscription models
"""

##########################################################################
## Imports
##########################################################################

from django.dispatch import receiver
from django.db.models.signals import post_save, pre_delete, post_delete
from subscription.models import *

##########################################################################
## SubscriptionService
##########################################################################

#Create product for new service
@receiver(post_save, sender=SubscriptionService)
def create_stripe_product(sender, instance, created, **kwargs):
    if created:
        instance._init_stripe_product()
        instance.save()

#Delete the product from stripe
@receiver(pre_delete, sender=SubscriptionService)
def delete_stripe_product(sender, instance, **kwargs):
    instance._delete_stripe_product()

##########################################################################
## SubscriptionPlan
##########################################################################

#Create the plan from stripe
@receiver(post_save, sender=SubscriptionPlan)
def create_stripe_plan(sender, instance, created, **kwargs):
    if created:
        instance._init_stripe_plan()
        instance.save()
        
#Delete the product from stripe
@receiver(pre_delete, sender=SubscriptionPlan)
def delete_stripe_plan(sender, instance, **kwargs):
    instance._delete_stripe_plan()

##########################################################################
## SubscriptionAccount
##########################################################################


##########################################################################
## SubscriptionMember
##########################################################################

#Delete the subscription with stripe
@receiver(pre_delete, sender=SubscriptionMember)
def delete_stripe_subscription_item(sender, instance, **kwargs):
    instance.cancel()
    
##########################################################################
## djstripe InvoiceItem
##########################################################################

