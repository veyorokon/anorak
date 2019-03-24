"""
Custom signals for the subscription models
"""

##########################################################################
## Imports
##########################################################################

from django.dispatch import receiver
from django.db.models.signals import post_save, pre_delete, post_delete
from subscription.models import *
from backend.fees import AnorakFeeManager
from backend.email import EmailManager
from backend.invoice import InvoiceManager

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
## SubscriptionMember
##########################################################################

#Send a receipt email
@receiver(post_save, sender=SubscriptionMember)
def send_invoice_receipt(sender, instance, created, **kwargs):
    if created:
        invoice = instance.user.upcoming_invoice()
        invoiceManager = InvoiceManager()
        emailManager = EmailManager(instance.user)
        invoiceItem = invoiceManager.get_closest_item(instance, invoice)
        emailManager.email_receipt(invoiceItem)

#Delete the subscription with stripe
@receiver(pre_delete, sender=SubscriptionMember)
def delete_stripe_subscription_item(sender, instance, **kwargs):
    instance.cancel()
    feeManager = AnorakFeeManager()
    feeManager.update_management_fee(user=instance.user)
    