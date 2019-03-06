from django.db import models
from core.models import User
from django.conf import settings
from django.utils import timezone
from . managers import InvoiceManager
from subscription.models import SubscriptionMember, MembershipStatus
from backend.utility import *


import stripe
stripe.api_key = settings.STRIPE_ACCOUNT_SID

"""
Invoices are created at the beginning of the month and billed at the end of the month.
"""    
class Invoice(models.Model):
    #The account receivable for this invoice
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="invoices")
    #Date that the invoice was sent to the user
    date_sent = models.DateTimeField(editable=False, null=True)
    #The month and year the invoice is for.
    date_for = models.DateTimeField(editable=False)
    #Date that the invoice was paid
    date_paid = models.DateTimeField(editable=False, null=True)
    #The option to void the invoice
    is_void = models.BooleanField(default=False)
    #If this invoice has been paid
    is_paid = models.BooleanField(default=False)
    #If the payment method for this invoice failed
    is_payment_failed = models.BooleanField(default=False)
    #Date that the service was created
    date_created = models.DateTimeField(editable=False)
    #Date that the service was modified
    date_modified = models.DateTimeField(editable=False)
    #Stripe invoice object
    stripe_invoice = models.CharField(max_length=64, null=True, blank=True, unique=True, editable=False)
    #Stripe invoice object
    stripe_invoice_fee_id = models.CharField(max_length=64, null=True, blank=True, unique=True, editable=False)
    
    #Set the default manager to the custom manager
    objects = InvoiceManager()
    
    class Meta:
        db_table = "Invoices"
        ordering = ['date_for']
        unique_together = ('user', 'date_for')
        
    def set_date_for_from_today(self):
        self.date_for = get_first_day_of_next_month()
    
    def set_stripe_invoice(self):
        customer = self.user.stripe_customer
        self.stripe_invoice = customer.get_stripe_latest_invoice().id
        
    def _update_stripe_invoice_fee(self):
        customer = self.user.stripe_customer
        invoice = customer.get_stripe_upcoming_invoice()
        previousFee = stripe.InvoiceItem.retrieve(self.stripe_invoice_fee_id)
        prviousFeeAmount = previousFee.amount
        total = float((invoice.subtotal-prviousFeeAmount)/100)
        fee = calculate_anorak_fee(total) #imported from utility
        stripe.InvoiceItem.modify(
          self.stripe_invoice_fee_id,
          amount = int(fee*100)
        )
                
    def _set_stripe_invoice_fee(self):
        customer = self.user.stripe_customer
        invoice = customer.get_stripe_upcoming_invoice()
        total = float(invoice.subtotal/100)
        fee = calculate_anorak_fee(total) #imported from utility
        item = stripe.InvoiceItem.create(
            customer=customer.stripe_customer_id, 
            amount=int(fee*100), 
            currency="usd", subscription=customer.stripe_subscription_id,
            description="Anorak Management Fee"
        )
        self.stripe_invoice_fee_id = item.id
        
    def update_stripe_invoice(self):
        if self.stripe_invoice_fee_id:
            self._update_stripe_invoice_fee()
        else:
            self._set_stripe_invoice_fee()
        
    def get_stripe_invoice(self):
        return stripe.Invoice.retrieve(
            id=self.stripe_invoice
        )
        
    def save(self, *args, **kwargs):
        ''' 
        On save, update timestamps 
        '''
        if not self.id:
            self.date_created = timezone.now()
            self.set_date_for_from_today()
            # self.set_stripe_invoice()
        self.update_stripe_invoice()
        self.date_modified = timezone.now()
        return super(Invoice, self).save(*args, **kwargs)
        
