import time
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
    #Stripe invoice number
    stripe_invoice_number = models.CharField(max_length=64, null=True, blank=True, unique=True, editable=False)
    #Stripe invoice object
    stripe_invoice_finalized_at = models.IntegerField(null=True, blank=True, unique=True, editable=False)
    #If the payment method for this invoice failed
    is_finalized = models.BooleanField(default=False)
    #Stripe invoice object
    stripe_invoice_fee_id = models.CharField(max_length=64, null=True, blank=True, unique=True, editable=False)
    
    #Set the default manager to the custom manager
    objects = InvoiceManager()
    
    class Meta:
        db_table = "Invoices"
        ordering = ['date_for']
        unique_together = ('user', 'date_for')
        
    def get_stripe_invoice(self):
        invoice = None
        if self.stripe_invoice:
            invoice = stripe.Invoice.retrieve(
                id=self.stripe_invoice
            )
        else:
            invoice = self.check_if_upcoming_invoice()
            if not invoice:
                invoice = self.check_if_latest_invoice()
        return invoice
    
    def check_if_upcoming_invoice(self):
        customer = self.user.stripe_customer
        upcomingInvoice = customer.get_stripe_upcoming_invoice()
        if self.is_matching_invoice(upcomingInvoice):
            return upcomingInvoice
        return None
    
    def check_if_latest_invoice(self):
        customer = self.user.stripe_customer
        latestInvoice = customer.get_stripe_latest_invoice()
        if self.is_matching_invoice(latestInvoice):
            return latestInvoice
        return None
        
    def set_date_for_from_today(self):
        self.date_for = get_first_day_of_next_month()
        
    def is_matching_invoice(self, invoice):
        '''
        Checks if the invoice passed is the current invoice
        '''
        if invoice.number == self.stripe_invoice_number:
            return True
        return False
    
    def finalize_invoice(self, invoice):
        finalized = invoice.status_transitions.finalized_at
        invoiceId = invoice.id
        self.stripe_invoice_finalized_at = finalized
        self.stripe_invoice = invoice.invoiceId
        self.is_finalized = True
            
    def initialize_invoice(self, upcomingInvoice=None):
        if not upcomingInvoice:
            customer = self.user.stripe_customer
            upcomingInvoice = customer.get_stripe_upcoming_invoice()
        self.stripe_invoice_number = upcomingInvoice.number
        self.set_date_for_from_today()
        
    def find_items(self, search, invoice):
        search = [term.lower() for term in search]
        found = []
        for item in invoice.lines.data:
            description = item.description.lower()
            if all(term in description for term in search):
                found.append(item)
        return found
        
    def delete_invoice_item(self, itemID):
        item = stripe.InvoiceItem.retrieve(itemID)
        item.delete()
        
    def calculate_management_fee(self, subtotal):
        subtotal /= 100 #Format from stripe
        if subtotal==0.0:
            return 0
        fee = round((subtotal * 0.03 + 0.50),2)
        if fee > 5.00:
            fee = min(fee, 5.00)
        return(int(fee*100))

    def prevent_duplicate_fees(self, managementFees):
        duplicateTotal = -1
        managementFee = None
        if len(managementFees) == 1:
            managementFee = managementFees[0]
            duplicateTotal = managementFee.amount
        elif len(managementFees) > 1:
            mgtFee = managementFees[0]
            duplicateTotal = mgtFee.amount
            duplicates = managementFees[1:]
            for duplicateFee in duplicates:
                self.delete_invoice_item(duplicateFee.id)
                duplicateTotal += duplicateFee.amount
            managementFee = mgtFee
        return managementFee, duplicateTotal
        
    def sync_with_stripe_and_finalize(self):
        invoice = self.user.stripe_customer.get_stripe_upcoming_invoice()
        if not self.is_matching_invoice(invoice):
            invoice = self.user.stripe_customer.get_stripe_latest_invoice()
            self.finalize_invoice(invoice)
            return True
        customer = self.user.stripe_customer
        duplicateFees = self.find_items("Anorak Management Fee", invoice)
        managementCharge, duplicateTotal = self.prevent_duplicate_fees(duplicateFees)
        if duplicateTotal == -1:
            item = self.create_management_charge(invoice)
        else:
            item = self.update_management_charge(invoice, managementCharge, duplicateTotal)
        self.stripe_invoice_fee_id = item.id
        return False  
           

    def update_management_charge(self, invoice, managementCharge, feeTotal=0.0):
        feeID = managementCharge.id
        totalWithoutFees = float(invoice.subtotal-feeTotal)
        fee = self.calculate_management_fee(totalWithoutFees)
        startTime = managementCharge.period.start
        endTime = managementCharge.period.end
        item = stripe.InvoiceItem.modify(
                    feeID,
                    amount = fee,
                    period = {
                    "start": startTime,
                    "end": endTime,
                  },
                )
        return item


    def create_management_charge(self, invoice):
        customer = self.user.stripe_customer
        timeNow = int(calendar.timegm(time.gmtime()))
        fee = self.calculate_management_fee(invoice.subtotal)
        item = stripe.InvoiceItem.create(
                customer=customer.stripe_customer_id, 
                amount=fee, 
                currency="usd", subscription=customer.stripe_subscription_id,
                description="Anorak Management Fee",
                period = {
                "start": timeNow,
                "end": get_first_day_next_month_epoch(),
              },
            )
        return item
    
    def save(self, *args, **kwargs):
        ''' 
        On save, update timestamps unless finalized
        '''
        if not self.id:
            self.date_created = timezone.now()
            self.initialize_invoice()
        if not self.is_finalized:
            self.sync_with_stripe_and_finalize()
            self.date_modified = timezone.now()
        return super(Invoice, self).save(*args, **kwargs)
