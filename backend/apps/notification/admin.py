"""
Custom admin for the notification models
"""

##########################################################################
## Imports
##########################################################################

from __future__ import unicode_literals

from django.contrib import admin
from django.apps import apps
from . models import *
    
@admin.register(EmailReceiptNotification)
class EmailReceiptNotificationAdmin(admin.ModelAdmin):
    """Define admin model for SubscriptionService."""
    list_display = (
        'id',
        'recipient',
        'processed',
        'date_created',
        'date_notified',
        'djstripe_event_id',
        'stripe_subscription_item_id',
        'stripe_invoice_item_id',
    )
    readonly_fields=(
    'stripe_invoice_item_id',
    'stripe_subscription_item_id',
    )