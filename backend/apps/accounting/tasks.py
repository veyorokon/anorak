# Create your tasks here
from __future__ import absolute_import, unicode_literals
from celery import task
from . models import Invoice
from core.models import User


@task
def sync_stripe_invoices():
    for eachUser in User.objects.all():
        try:
            lastInvoice = Invoice.objects.get(user=eachUser).order_by('-id')[0]
            finalized = lastInvoice.sync_with_stripe_and_finalize()
            lastInvoice.save()
            if finalized:
                invoice = Invoice.objects.get_or_create_this_month(
                    user = eachUser
                )
        except:
            invoice = Invoice.objects.get_or_create_this_month(
                user = eachUser
            )    
    return True
        
        
