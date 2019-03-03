from django.db import models
from core.models import User
from subscription.models import SubscriptionMember
from django.utils import timezone
from backend.utility import get_first_day, get_last_day, today, days_left_in_month, days_this_month
from . managers import InvoiceManager

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
    
    #Set the default manager to the custom manager
    objects = InvoiceManager()
    
    class Meta:
        db_table = "Invoices"
        unique_together = ('user', 'date_for')
        
    def set_date_for_from_today(self):
        self.date_for = get_last_day(today())
    
    def save(self, *args, **kwargs):
        ''' 
        On save, update timestamps 
        '''
        if not self.id:
            self.date_created = timezone.now()
            self.set_date_for_from_today()
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