import datetime
import time
import calendar
from backend.utility import *
from core.models import User
from django.template import Context

from accounting.models import Invoice
from mail_templated import EmailMessage
from django.template.loader import render_to_string, get_template
from django.contrib.staticfiles.templatetags.staticfiles import static


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

def set_invoice_dates(output, itemStartEpoch, date, stripeInvoice):
    billingDateTime = convert_epoch(stripeInvoice.period_end)
    
    lastDayOfMonth = days_in_a_month(date)
    endDateTime = datetime.strptime('{0} {1} {2}'.format(date.month, lastDayOfMonth, date.year), '%m %d %Y')
    billingDateTime = convert_epoch(stripeInvoice.period_end)
    endDate = endDateTime.strftime('%B %d, %Y')
    renewalDate = get_first_day_of_next_month(endDateTime).strftime('%B %d, %Y')
    startDate = convert_epoch(itemStartEpoch).strftime('%B %d, %Y')
    billingDate = billingDateTime.strftime('%B %d, %Y')
    
    output["date_end"] = endDate
    output["date_renew"] = renewalDate
    output["date_start"] = startDate
    output["date_billing"] = billingDate
    return output

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
    output["invoice_number"] = stripeInvoice.number
    date = convert_epoch(stripeInvoice.period_end)
    billingDateTime = convert_epoch(stripeInvoice.period_end)
    output = set_invoice_dates(output, itemStartEpoch, date, stripeInvoice)
    output["lastItem"]={"description": plan+" - Month of "+billingDateTime.strftime('%B'),  "price": amount}
    output["service"]= member.subscription_account.service.name
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