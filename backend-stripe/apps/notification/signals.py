"""
Custom signals for the notification models
"""

##########################################################################
## Imports
##########################################################################

from django.dispatch import receiver
from django.db.models.signals import post_save, pre_delete, post_delete
from notification.models import EmailReceiptNotification
from backend.fees import AnorakFeeManager
from backend.email import EmailManager
from backend.invoice import InvoiceManager
from djstripe.models import Event
import json


##########################################################################
## Event
##########################################################################

@receiver(post_save, sender=Event)
def trigger_email_event(sender, instance, created, **kwargs):
    invoice = None
    updateFee = False
    if instance.customer:
        user = instance.customer.subscriber
        invoice = user.upcoming_invoice()

    if instance.type == 'invoiceitem.created':
        emailManager = EmailManager(user, invoice=invoice)
        invoiceItem = emailManager.invoiceData[0]
        if invoiceItem.amount <= 0:
            emailManager.email_refund(invoiceItem)
            updateFee = True
            

    elif instance.type == 'customer.subscription.updated':
        invoiceManager = InvoiceManager()
        newSubscriptionItemId = invoiceManager.get_new_subscription_item_id(
            instance
        )
        emailNotification = EmailReceiptNotification.objects.get(
            subscription_member__stripe_subscription_item_id=newSubscriptionItemId
        )
        
        if emailNotification.processed == False:
            invoiceItem = invoiceManager.get_invoice_subscription_item(
                newSubscriptionItemId, 
                invoice
            )
            emailNotification.process(instance, invoiceItem, invoice)
            updateFee = True
            
    if updateFee:        
        feeManager = AnorakFeeManager()
        feeManager.deep_update_management_fee(user=user, invoice=invoice)