from django.conf import settings
from django.dispatch import receiver
from core.models import User
from django.db.models.signals import post_save, pre_delete
from backend.utility import *

import stripe
stripe.api_key = settings.STRIPE_ACCOUNT_SID
anorakPlan = settings.STRIPE_ANORAK_PLAN


#Create a base subscription to the Anorak product
# @receiver(post_save, sender=StripeCustomer)
# def create_stripe_customer_subscription(sender, instance, created, **kwargs):
#     if created:
#         subscription = stripe.Subscription.create(
#             customer=instance.stripe_customer_id,
#             items=[
#                 {
#                     "plan": anorakPlan,
#                 },
#             ],
#             billing_cycle_anchor=get_first_day_next_month_epoch()
#         )
#         instance.stripe_subscription_id = subscription.id
#         instance.save()