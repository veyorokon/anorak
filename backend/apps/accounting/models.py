from django.db import models
from core.models import User
from subscription.models import SubscriptionMember


class AccountReceivable(models.Model):
    #The user.
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="account_receivable")
    #The current balance of the account
    balance_current = models.FloatField(default=0.0)
    
    class Meta:
        db_table="Account_Receivables"
        
        
class Invoice(models.Model):
    #The account receivable for this invoice
    account_receivable = models.ForeignKey(AccountReceivable, on_delete=models.CASCADE, related_name="invoices")
    #Date that the invoice was sent to the user
    date_sent = models.DateTimeField(editable=False)
    #The month and year the invoice is for.
    date_for = models.DateTimeField(editable=False)
    #Date that the invoice was paid
    date_paid = models.DateTimeField(editable=False)
    #The option to void the invoice
    is_void = models.BooleanField(default=False)
    
    class Meta:
        db_table = "Invoices"
        
class InvoiceItem(models.Model):
    #The invoice this itemized object appears in
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, related_name="items")
    #The subscription membership for this itemized line
    subscription_member = models.ForeignKey(SubscriptionMember, on_delete=models.CASCADE, related_name="invoice_items")
    #The amount due
    amount = models.FloatField(blank=False,null=False)
    #If this item is voided
    is_voided = models.BooleanField(default=False)
    #If the item is in a free trial period
    is_free_trial = models.BooleanField(default=False)
    
    class Meta:
        db_table = "Invoice_Items"