# Create your tasks here
from __future__ import absolute_import, unicode_literals
from celery import task
from . models import Invoice
from core.models import User


@task
def sync_stripe_invoices():
    for eachUser in User.objects.all():
        invoice = Invoice.objects.get_or_create_this_month(
            user = eachUser
        )
        invoice.save()
    return True
        
        
