"""
Custom signals for the subscription models
"""

##########################################################################
## Imports
##########################################################################

from django.dispatch import receiver
from django.db.models.signals import post_save, pre_delete, post_delete
from subscription.models import SubscriptionService, SubscriptionPlan

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


# #Create invoice and email receipt
# @receiver(post_save, sender=SubscriptionMember)
# def create_invoice(sender, instance, created, **kwargs):
#     if created:
#         invoice = Invoice.objects.get_or_create_this_month(
#             user = instance.user
#         )
#         invoice.save() # Triggers the invoice update
#     else:
#         invoice = Invoice.objects.get(user=instance.user)
#         invoice.save() # Triggers the invoice update
# 
# 
# # Delete the Stripe customer from the model
# @receiver(pre_delete, sender=SubscriptionPricingPlan)
# def delete_stripe_plan(sender, instance=None, **kwargs):
#     try:
#         instance.delete_stripe_plan()
#     except:
#         pass
# 
# # Delete the Stripe customer from the model
# @receiver(pre_delete, sender=SubscriptionMember)
# def delete_subscription_membership(sender, instance=None, **kwargs):
#     try:
#         instance.cancel()
#         invoice = Invoice.objects.get(user=instance.user).order_by('-id')[0]
#         invoice.sync_with_stripe_or_finalize() # Triggers the invoice update
#         invoice.save()
#     except:
#         pass