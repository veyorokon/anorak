"""
Custom signals for the subscription models
"""

##########################################################################
## Imports
##########################################################################

from django.dispatch import receiver
from django.db.models.signals import post_save, pre_delete, post_delete
from subscription.models import *
from djstripe.models import WebhookEventTrigger
from backend.fees import AnorakFeeManager
from backend.email import EmailManager
from backend.invoice import InvoiceManager
from . enum import SubscriptionAccountType
import json

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

#Delete the subscription item with stripe
@receiver(pre_delete, sender=SubscriptionMember)
def delete_stripe_subscription_item(sender, instance, **kwargs):
    try:
        instance.cancel()
    except:
        pass
    
        
##########################################################################
## WebhookEventTrigger
##########################################################################

@receiver(post_save, sender=WebhookEventTrigger)
def trigger_refund_email(sender, instance, created, **kwargs):
    data = json.loads(instance.body)
    invoice = None
    
    if data['data']['object'] and data['data']['object']['customer']:
        subscriberID = data['data']['object']['customer']
        user = Customer.objects.get(id=subscriberID).subscriber
        invoice = user.upcoming_invoice()
        
    if (instance.valid and data['type'] == 'invoiceitem.created'):
        emailManager = EmailManager(user, invoice=invoice)
        invoiceItem = emailManager.invoiceData[0]
        if invoiceItem.amount <= 0:
            emailManager.email_refund(invoiceItem)
        else:
            emailManager.email_receipt(invoiceItem)
            
    elif (instance.valid and data['type'] == 'customer.subscription.updated'):
        feeManager = AnorakFeeManager()
        feeManager.update_management_fee(user=user, invoice=invoice)