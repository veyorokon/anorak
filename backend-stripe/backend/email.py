"""
Custom email manager to for stripe invoices
"""

##########################################################################
## Imports
##########################################################################

from mail_templated import EmailMessage
from backend.utility import *
from subscription.models import SubscriptionMember

##########################################################################
## Email Manager
##########################################################################

class EmailManager(object):
    
    def __init__(self):
        pass
    
    def _invoice_data(self, invoice):
        return invoice.lines.data
    
    def _invoice_items_from_product_name(self, productName, invoice):
        invoiceData = self._invoice_data(invoice)
        items = self.find_items([productName], invoiceData)
        return items
    
    def _is_prorated(self, item):
        itemPrice = item.amount
        planPrice = self._get_item_plan_amount(item)
        return itemPrice != planPrice
    
    def _get_item_name(self, item):
        if item.plan:
            member = self._member_from_item(item)
            return member.subscription_account.subscription_plan.product_name
        return item.description
    
    def _format_val(self, value):
        if value:
            return value/100
        return value
    
    def _get_item_prorated_amount(self, item):
        if self._is_prorated(item) and item.plan:
            return self._format_val(item.amount)
        return None
    
    def _get_item_plan_amount(self, item):
        if item.plan:
            return self._format_val(item.plan.amount)
        return self._format_val(item.amount)
    
    def _get_invoice_billing_date_time(self, invoice):
        return convert_epoch(invoice.period_end)
    
    def _get_invoice_billing_date(self, invoice):
        billingDateTime = self._get_invoice_billing_date_time(invoice)
        return date_time_to_date(billingDateTime)
    
    def _get_invoice_end_date_time(self, invoice):
        date = self._get_invoice_billing_date_time(invoice)
        lastDayOfMonth = days_in_a_month(date)
        return datetime.strptime('{0} {1} {2}'.format(
            date.month, 
            lastDayOfMonth, 
            date.year), '%m %d %Y'
        )
    
    def _get_invoice_end_date(self, invoice):
        endDateTime = self._get_invoice_end_date_time(invoice)
        return date_time_to_date(endDateTime)
    
    def _get_invoice_renewal_date_time(self, invoice):
        endDateTime = self._get_invoice_end_date_time(invoice)
        return get_first_day_of_next_month(endDateTime)
    
    def _get_invoice_renewal_date(self, invoice):
        renewalDateTime = self._get_invoice_renewal_date_time(invoice)
        return date_time_to_date(renewalDateTime)
    
    def _item_plan_description(self, item, invoice):
        if not item.plan:
            return None
        monthOf = self._get_invoice_billing_date_time(invoice)
        member = self._member_from_item(item)
        plan = member.subscription_account.subscription_plan.product_name
        return  plan+" - Month of "+monthOf.strftime('%B')
    
    def _item_prorated_description(self):
        if not item.plan:
            return item.description
        return None
    
    def _was_item_canceled(self, item):
        if self._is_prorated(item) and item.plan and item.amount <= 0:
            return True
        return False
    
    def _item_dictionary(self, item, invoice):   
        return({
            'item_id': item.id,
            'plan_description': self._item_plan_description(item, invoice),
            'prorated_description': item.description,
            'plan_amount': self._get_item_plan_amount(item),
            'prorated_amount': self._get_item_prorated_amount(item),
        })
    
    def _member_from_item(self, item):
        plan = item.plan.id
        return SubscriptionMember.objects.get(
            subscription_account__subscription_plan__stripe_plan_id=plan
        )
    
    def _dictionary_with_invoice_dates(self, invoice):
        dictionary = {}
        dictionary['items']={}
        dictionary['biling_date'] = self._get_invoice_billing_date(invoice)
        dictionary['renewal_date'] = self._get_invoice_renewal_date(invoice)
        dictionary['end_date'] = self._get_invoice_end_date(invoice)
        return dictionary
    
    def invoice_to_dict(self, invoice):
        dictionary = self._dictionary_with_invoice_dates(invoice)
        items = []
        for item in self._invoice_data(invoice):
            items.append(self._item_dictionary(item, invoice))
        dictionary['items'] = items
        return dictionary
        
    def find_items(self, search, invoiceData):
        search = [term.lower() for term in search]
        found = []
        for item in invoiceData:
            description = item.description.lower()
            if all(term in description for term in search):
                found.append(item)
        return found
    
    def email_item_receipt(self, item, invoice):
        invoiceDictionary = self._dictionary_with_invoice_dates(invoice)
        itemDictionary = {'items' : 
                          [self._item_dictionary(item, invoice)]
                         }
        receiptDictionary = {**invoiceDictionary, **itemDictionary}
        member = self._member_from_item(item)