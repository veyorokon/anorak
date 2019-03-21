from django.conf import settings
from django.dispatch import receiver
from core.models import User
from django.db.models.signals import post_save, pre_delete, post_delete
from backend.utility import *

import stripe
stripe.api_key = settings.STRIPE_ACCOUNT_SID
anorakPlan = settings.STRIPE_ANORAK_PLAN

from djstripe.models import Customer, Subscription, Plan

#Create a base subscription to the Anorak product
@receiver(post_save, sender=User)
def create_stripe_customer(sender, instance, created, **kwargs):
    if created:
        customer = Customer.create(instance)
        
        
# #Create a base subscription to the Anorak product
@receiver(post_save, sender=Customer)
def create_stripe_subscription(sender, instance, created, **kwargs):
    if created:
        plan = Plan.objects.get(id=anorakPlan)
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
        
# Delete the Stripe customer from the model
@receiver(post_delete, sender=User)
def delete_stripe_customer(sender, instance=None, **kwargs):
    try:
        instance.djstripe_customer.delete()
    except:
        pass  