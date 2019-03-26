"""
Custom email manager to for stripe invoices
"""

##########################################################################
## Imports
##########################################################################

from mail_templated import EmailMessage
from backend.utility import *
from subscription.models import SubscriptionMember, SubscriptionPlan
from backend.fees import AnorakFeeManager
from djstripe.models import Customer

anorakFeeManager = AnorakFeeManager()

##########################################################################
## Email Manager
##########################################################################

"""
Custom email manager to for stripe invoices
"""

##########################################################################
## Imports
##########################################################################

from mail_templated import EmailMessage
from backend.utility import *
from subscription.models import SubscriptionMember, SubscriptionPlan
from backend.fees import AnorakFeeManager
from djstripe.models import Customer

anorakFeeManager = AnorakFeeManager()

##########################################################################
## Email Manager
##########################################################################

class EmailManager(object):
    
    def __init__(self, user, invoice=None):
        self.invoice = invoice
        if invoice == None:
            self.invoice = user.upcoming_invoice()
        self.invoiceData = self._invoice_data()
        self.customer = self._get_customer_from_invoice()
        self.user = self.customer.subscriber
    
    def _invoice_data(self):
        return self.invoice.lines.data
    
    def _invoice_items_from_product_name(self, productName):
        invoiceData = self.invoiceData
        items = self.find_items([productName])
        return items
    
    def _get_item_name(self, item):
        if item.plan:
            member = self._member_from_item(item)
            return member.subscription_account.subscription_plan.product_name
        return item.description
    
    def _format_val(self, value):
        if value != None:
            return round((value/100),2)
        return 0
    
    def _is_item_refund(self, item):
        prorated_amount = self._get_item_prorated_amount(item)
        wasRefund = False
        if (prorated_amount and prorated_amount < 0):
            wasRefund = True
        return wasRefund
    
    def _get_item_prorated_amount(self, item):
        if self._is_prorated(item) and item.plan:
            return self._format_val(item.amount)
        return None
    
    def _is_prorated(self, item):
        itemPrice = item.amount
        planPrice = self._get_item_plan_amount(item)
        return itemPrice != planPrice
    
    def _get_item_plan_amount(self, item):
        if item.plan:
            if item.amount < 0:
                return -1 * self._format_val(item.plan.amount)
            return self._format_val(item.plan.amount)
        return self._format_val(item.amount)
    
    def _get_invoice_billing_date_time(self):
        return convert_epoch(self.invoice.period_end)
    
    def _get_invoice_billing_date(self):
        billingDateTime = self._get_invoice_billing_date_time()
        return date_time_to_date(billingDateTime)
    
    def _get_invoice_end_date_time(self):
        date = self._get_invoice_billing_date_time()
        lastDayOfMonth = days_in_a_month(date)
        return datetime.strptime('{0} {1} {2}'.format(
            date.month, 
            lastDayOfMonth, 
            date.year), '%m %d %Y'
        )
    
    def _current_date(self):
        currentDateTime = convert_epoch(get_current_epoch())
        return date_time_to_date(currentDateTime)
    
    def _get_invoice_end_date(self):
        endDateTime = self._get_invoice_end_date_time()
        return date_time_to_date(endDateTime)
    
    def _get_invoice_renewal_date_time(self):
        endDateTime = self._get_invoice_end_date_time()
        return get_first_day_of_next_month(endDateTime)
    
    def _get_invoice_renewal_date(self):
        renewalDateTime = self._get_invoice_renewal_date_time()
        return date_time_to_date(renewalDateTime)
    
    def _get_invoice_start_date_time(self, item):
        if item:
            return item.period.start
        least = self.invoiceData[0].period.start
        for item in self.invoiceData:
            if item.period.start < least:
                least = item.period.start
        return least
    
    def _get_invoice_start_date(self, item):
        startDateEpoch = self._get_invoice_start_date_time(item)
        startDateTime = convert_epoch(startDateEpoch)
        return date_time_to_date(startDateTime)
    
    def _item_plan_description(self, item):
        if not item.plan:
            return item.description
        monthOf = self._get_invoice_billing_date_time()
        #member = self._member_from_item(item)
        subscriptionPlan = SubscriptionPlan.objects.get(stripe_plan_id=item.plan.id)
        plan = subscriptionPlan.product_name
        return  plan+" - Month of "+monthOf.strftime('%B')
    
    def _item_prorated_description(self, item):
        if not item.plan:
            return None
        return item.description
    
    def _was_item_canceled(self, item):
        if self._is_prorated(item) and item.plan and item.amount <= 0:
            return True
        return False
    
    def _item_dictionary(self, item):
        return({
            'item_id': item.id,
            'plan_description': self._item_plan_description(item),
            'prorated_description': self._item_prorated_description(item),
            'plan_amount': self._get_item_plan_amount(item),
            'prorated_amount': self._get_item_prorated_amount(item),
            'was_refunded': self._is_item_refund(item)
        })
    
    def _member_from_item(self, item):
        plan = item.plan.id
        return SubscriptionMember.objects.get(
            subscription_account__subscription_plan__stripe_plan_id=plan,
            user = self.user
        )
    
    def _get_customer_from_invoice(self):
        return Customer.objects.get(id=self.invoice.customer)
    
    def _get_shipping_data(self):
        customerAPI = self.customer.api_retrieve()
        return customerAPI.shipping
    
    def _get_card_last4(self):
        customerAPI = self.customer.api_retrieve()
        return customerAPI.default_source.last4
    
    def _get_user_address_dict(self):
        shippingData = self._get_shipping_data()
        addressData = shippingData.address
        return({
            'line1': addressData.line1,
            'line2': addressData.line2,
            'zip': addressData.postal_code,
            'state': addressData.state,
            'city': addressData.city,
        })
        return shippingData
    
    def _init_invoice_dict(self, item=None):
        dictionary = {}
        dictionary['items']={}
        dictionary['invoice_number'] = self.invoice.number
        dictionary['billing_date'] = self._get_invoice_billing_date()
        dictionary['renewal_date'] = self._get_invoice_renewal_date()
        dictionary['end_date'] = self._get_invoice_end_date()
        dictionary['start_date'] = self._get_invoice_start_date(item)
        dictionary['address'] = self._get_user_address_dict()
        dictionary['last4'] = self._get_card_last4()
        return dictionary
       
    def _get_item_total(self, invoiceDictionaryItem):
        itemTotal = invoiceDictionaryItem['plan_amount']
        if invoiceDictionaryItem['prorated_amount']:
            itemTotal += invoiceDictionaryItem['prorated_amount']
        return itemTotal
    
    def _get_invoice_subtotal_from_dict(self, invoiceDictionary):
        total = 0.0
        for invoiceDictionaryItem in invoiceDictionary['items']:
            itemTotal = self._get_item_total(invoiceDictionaryItem)
            total += itemTotal
        return total
    
    def _get_invoice_items(self, receiptItem):
        items = []
        anorakFee = None
        if receiptItem:
            item = self._item_dictionary(receiptItem)
            if anorakFeeManager.feeDescription == receiptItem.description :
                anorakFee = item
            else:
                items.append(item)
        else:
            for item in self.invoiceData:
                if anorakFeeManager.feeDescription != item.description:
                    items.append(self._item_dictionary(item))
                else:
                    anorakFee = self._item_dictionary(item)
        if anorakFee:
            items.append(anorakFee)
            return items, True 
        return items, False
    
    def _get_invoice_type(self, receiptItem):
        invoiceType = 'multiple'
        if receiptItem:
            invoiceType = 'single'
        return invoiceType
    
    def _get_tax_amount(self, subtotal, taxPercent):
        return self._format_val(taxPercent * subtotal)
    
    def invoice_to_dict(self, receiptItem=None):
        dictionary = self._init_invoice_dict(receiptItem)
        taxPercent = self.invoice.tax_percent
        items, hasAnorakFee = self._get_invoice_items(receiptItem)
        dictionary['items'] = items
        subtotal = self._get_invoice_subtotal_from_dict(dictionary)
        taxAmount = self._get_tax_amount(subtotal, taxPercent)
        dictionary['subtotal'] = '{:.2f}'.format(subtotal)
        dictionary['tax'] = '{:.2f}'.format(taxAmount)
        dictionary['total'] = '{:.2f}'.format(round((subtotal + taxAmount),2))
        dictionary['tax_percent'] = '{:.2f}'.format(taxPercent)
        dictionary['type'] = self._get_invoice_type(receiptItem)
        dictionary['has_anorak_fee'] = hasAnorakFee
        return dictionary
        
    def find_items(self, search):
        search = [term.lower() for term in search]
        found = []
        for item in self.invoiceData:
            description = item.description.lower()
            if all(term in description for term in search):
                found.append(item)
        return found
    
    def email_receipt(self, receiptItem=None):
        dictionary = self.invoice_to_dict(receiptItem=receiptItem)               
        message = EmailMessage('receipt.tpl', 
            {'user': self.user, 'data':dictionary}, 
            'Anorak@ianorak.com', 
            to =[self.user.email]
        )
        message.send()
        return dictionary
    
    def email_refund(self, refundItem):
        dictionary = self.invoice_to_dict(receiptItem=refundItem)   
        cancelDate = self._current_date()
        message = EmailMessage('refund.tpl', 
            {'user': self.user, 'data':dictionary, 'date_cancelled':cancelDate}, 
            'Anorak@ianorak.com', 
            to =[self.user.email]
        )
        message.send()
        return dictionary