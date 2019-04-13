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
        stripe.Customer.delete(instance.djstripe_customer.id)
        instance.djstripe_customer.delete()
    except:
        pass


@receiver(post_save, sender=User)
def create_stripe_customer(sender, instance, created, **kwargs):
    if created:
        customer = Customer.create(instance)
