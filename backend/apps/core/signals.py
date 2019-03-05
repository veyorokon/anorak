from django.conf import settings
from django.dispatch import receiver
from accounting.models import Invoice
from core.models import User, StripeCustomer
from django.db.models.signals import post_save, pre_delete

import stripe
stripe.api_key = settings.STRIPE_ACCOUNT_SID
anorakPlan = settings.STRIPE_ANORAK_PLAN

#Create a stripe customer for the new user
@receiver(post_save, sender=User)
def create_stripe_customer(sender, instance, created, **kwargs):
    if created:
        customer = StripeCustomer.objects.create(
            user = instance,
        )
        
# Delete the Stripe customer from the model
@receiver(pre_delete, sender=StripeCustomer)
def delete_stripe_customer(sender, instance=None, **kwargs):
    instance.delete_customer()
    
#Create a base subscription to the Anorak product
@receiver(post_save, sender=StripeCustomer)
def create_stripe_customer_subscription(sender, instance, created, **kwargs):
    if created:
        stripe.Subscription.create(
            customer=instance.stripe_customer_id,
            items=[
                {
                    "plan": anorakPlan,
                },
            ]
        )