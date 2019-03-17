import datetime
import time
import calendar
from backend.utility import *
from core.models import User
from accounting.models import Invoice
from mail_templated import EmailMessage


def get_item_from_invoice(plan, invoice):
    stripeInvoice = invoice.get_stripe_invoice()
    item = invoice.find_items(plan.split(), stripeInvoice)[0]
    return item, stripeInvoice

def is_prorated(stripeInvoiceItem):
    itemPrice = stripeInvoiceItem.amount
    planPrice = stripeInvoiceItem.plan.amount
    return itemPrice != planPrice

def days_in_a_month(date):
    return calendar.monthrange(date.year,date.month)[1]

def get_receipt_data(member, invoice):
    total = 0
    output = {}
    
    plan = member.subscription_account.price_plan.get_product_name()
    item, stripeInvoice = get_item_from_invoice(plan, invoice)
    itemStartEpoch = item.period.start
    if is_prorated(item):
        amount = item.amount/100
        output["items"]=[{"description": item.description,  "price": amount}]
        total += amount
    amount = item.plan.amount/100
    
    output["total"] = (total + amount)
    
    date = convert_epoch(stripeInvoice.period_end)
    monthOf = convert_epoch(stripeInvoice.period_end)
    lastDay = days_in_a_month(date)
    endDateTime = datetime.strptime('{0} {1} {2}'.format(date.month, lastDay, date.year), '%m %d %Y')
    output["date_end"] = endDateTime.strftime('%B %d, %Y')
    output["date_renew"] = get_first_day_of_next_month(endDateTime).strftime('%B %d, %Y')
    output["date_start"] = convert_epoch(itemStartEpoch).strftime('%B %d, %Y')
    output["date_billing"] = monthOf.strftime('%B %d, %Y')
    output["invoice_number"] = stripeInvoice.number
    
    output["service"]= member.subscription_account.service.name
    output["lastItem"]={"description": plan+" - Month of "+monthOf.strftime('%B'),  "price": amount}
    return output

def convert_epoch(epoch):
    date = datetime.fromtimestamp(epoch)
    return date
    
def email_receipt(member, invoice):
    data = get_receipt_data(member, invoice)
    message = EmailMessage('invoice.tpl', 
                       {'user': member.user, 'data':data}, 
                       'Anorak@ianorak.com', 
                       to =[member.user.email]
                      )
    message.send()