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
    stripe_invoice = models.CharField(max_length=128, null=True, blank=True, unique=True, editable=False)
    
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
        
    def get_stripe_invoice(self):
        return stripe.Invoice.retrieve(
            id=self.stripe_invoice
        )
    
    def build_invoice(self):
        memberships = self.user.subscription_memberships.all().filter(
            status_membership__gte = MembershipStatus.PENDING_CREATED
        )
        for membership in memberships:
            InvoiceItem.objects.get_or_create(
                invoice =self,
                subscription_member = membership
            )
        
    def save(self, *args, **kwargs):
        ''' 
        On save, update timestamps 
        '''
        if not self.id:
            self.date_created = timezone.now()
            self.set_date_for_from_today()
            self.set_stripe_invoice()
        self.date_modified = timezone.now()
        return super(Invoice, self).save(*args, **kwargs)
        
        
class InvoiceItem(models.Model):
    #The invoice this itemized object appears in
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, related_name="items")
    #The subscription membership for this itemized line
    subscription_member = models.ForeignKey(SubscriptionMember, on_delete=models.CASCADE, related_name="invoice_items")
    #The number of days the service was used
    usage = models.IntegerField()
    #The amount due
    amount = models.FloatField(blank=False,null=False)
    #If this item is voided
    is_voided = models.BooleanField(default=False)
    #If the item is in a free trial period
    is_free_trial = models.BooleanField(default=False)
    #Date that the service was created
    date_created = models.DateTimeField(editable=False)
    #Date that the service was modified
    date_modified = models.DateTimeField(editable=False)
    #Stripe invoice object
    stripe_invoice_item = models.CharField(max_length=128, null=True, blank=True, unique=True, editable=False)
    
    class Meta:
        db_table = "Invoice_Items"
        unique_together = ('invoice', 'subscription_member')
        
    def set_usage_from_today(self):
        self.usage = abs(days_left_in_month().days)
        
    def set_amount_from_today(self):
        usage = abs(days_left_in_month().days)
        price = self.subscription_member.subscription_account.price_plan.amount
        pricePerDay = price / days_this_month()
        amount = usage * pricePerDay
        self.amount = round(amount, 2)
    
    def create_stripe_invoice_item(self):
        member = self.subscription_member
        invoice = self.invoice.get_stripe_invoice().id
        customer = member.user.stripe_customer.stripe_customer_id
        service = member.subscription_account.service.name
        item = stripe.InvoiceItem.create(
            customer=customer,
            amount=int(self.amount*100),
            invoice=invoice,
            currency="usd",
            description=service
        )
        self.stripe_invoice_item = item.id
        
    def save(self, *args, **kwargs):
        ''' 
        On save, update timestamps 
        '''
        if not self.id:
            self.date_created = timezone.now()
            self.set_usage_from_today()
            self.set_amount_from_today()
        self.date_modified = timezone.now()
        return super(InvoiceItem, self).save(*args, **kwargs)