import json
from django.conf import settings
from django.dispatch import receiver
from core.models import User
from django.db.models.signals import post_save, pre_delete, post_delete
from backend.utility import *
from backend.fees import AnorakFeeManager
from backend.stripe import stripe

from djstripe.models import Customer, Invoice

anorakPlan = settings.STRIPE_ANORAK_PLAN
##########################################################################
## User
##########################################################################

@receiver(post_delete, sender=User)
def delete_stripe_customer(sender, instance=None, **kwargs):
    try:
        instance.djstripe_customer.delete()
    except:
        pass     
    
@receiver(post_save, sender=User)
def create_stripe_customer(sender, instance, created, **kwargs):
    if created:
        customer = Customer.create(instance)
        
##########################################################################
## Customer
##########################################################################

@receiver(post_save, sender=Customer)
def create_stripe_subscription(sender, instance, created, **kwargs):
    if created:
        anchor = get_first_day_of_next_month()
        stripe.Subscription.create(
            customer=instance.id,
            items=[
                {
                    "plan": anorakPlan,
                },
            ],
            billing_cycle_anchor=get_first_day_next_month_epoch()
        )   

##########################################################################
## Invoice
##########################################################################

@receiver(post_save, sender=Invoice)
def create_anorak_fee(sender, instance, created, **kwargs):
    if created:
        user = instance.customer.subscriber
        feeManager = AnorakFeeManager()
        feeManager.deep_update_management_fee(user=user)
        