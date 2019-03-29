"""
Custom fee manager to calculate and maintain anorak fees on stripe invoices
"""

##########################################################################
## Imports
##########################################################################

from backend.utility import *
from backend.stripe import stripe
import calendar
import time


##########################################################################
## Anorak Fee Manager
##########################################################################

class AnorakFeeManager(object):
    def __init__(self):
        self.feeDescription = "Anorak Management Fee"
    
    def _prevent_duplicate_fees(self, potentialDuplicateItems):
        duplicateTotal = -1
        item = None
        if len(potentialDuplicateItems) == 1:
            item = potentialDuplicateItems[0]
            duplicateTotal = item.amount
        elif len(potentialDuplicateItems) > 1:
            mgtFee = potentialDuplicateItems[0]
            duplicateTotal = mgtFee.amount
            duplicates = potentialDuplicateItems[1:]
            for duplicateFee in duplicates:
                self._delete_invoice_item(duplicateFee.id)
                duplicateTotal += duplicateFee.amount
            item = mgtFee
        return item, duplicateTotal

    def _create_management_charge(self, user, invoice):
        customer = user.djstripe_customer
        subscription = user.djstripe_subscription
        timeNow = int(calendar.timegm(time.gmtime()))
        fee = self.calculate_management_fee(invoice.subtotal)
        item = stripe.InvoiceItem.create(
                customer=customer.id, 
                amount=fee, 
                currency="usd", 
                subscription=subscription.id,
                description=self.feeDescription,
                period = {
                "start": timeNow,
                "end": get_first_day_next_month_epoch(),
              },
            )
        return item
    
    def _update_management_charge(self, invoice, existingItem, feeTotal=0.0):
        feeID = existingItem.id
        totalWithoutFees = float(invoice.subtotal-feeTotal)
        fee = self.calculate_management_fee(totalWithoutFees)
        startTime = existingItem.period.start
        endTime = existingItem.period.end
        if feeTotal != fee:
            return stripe.InvoiceItem.modify(
                        feeID,
                        amount = fee,
                        period = {
                        "start": startTime,
                        "end": endTime,
                      },
                    )
        return existingItem
    
    def _delete_invoice_item(self, itemID):
        item = stripe.InvoiceItem.retrieve(itemID)
        item.delete()
    
    def find_items(self, search, invoice):
        lineItems = invoice.lines.data
        return self.search_invoice_line_items(search, lineItems)
    
    def search_invoice_line_items(self, search, lineItems):
        search = [term.lower() for term in search]
        found = []
        for item in lineItems:
            description = item.description.lower()
            if all(term in description for term in search):
                found.append(item)
        return found
    
    def calculate_management_fee(self, subtotal):
        subtotal /= 100 #Format from stripe
        if subtotal==0.0:
            return 0
        fee = round((subtotal * 0.03 + 0.50) ,2)
        if fee > 5.00:
            fee = min(fee, 5.00)
        return(int(fee*100))
    
    def update_management_fee(self, user, invoice=None):
        if invoice == None:
            invoice = user.upcoming_invoice()
        feeItems = self.find_items(self.feeDescription, invoice)
        if feeItems:
            item, total = self._prevent_duplicate_fees(feeItems)
            return self._update_management_charge(invoice, item, total)
        return self._create_management_charge(user, invoice)
    
    def _batch_invoice_items(self, user, limit):
        return stripe.InvoiceItem.list(
            customer = user.djstripe_customer.id,
            pending=True,
            limit=limit
        )
    
    def deep_update_management_fee(self, user, invoice=None, limit=50):
        if invoice == None:
            invoice = user.upcoming_invoice()
        batchInvoiceItems = self._batch_invoice_items(user, limit)
        feeItems = self.search_invoice_line_items(
            [self.feeDescription], 
            batchInvoiceItems
        )
        if feeItems:
            item, total = self._prevent_duplicate_fees(feeItems)
            return self._update_management_charge(invoice, item, total)
        return self._create_management_charge(user, invoice)