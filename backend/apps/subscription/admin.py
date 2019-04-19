"""
Custom admin for the subscription models
"""

##########################################################################
## Imports
##########################################################################

from __future__ import unicode_literals

from django.contrib import admin
from django.apps import apps
from . models import *

@admin.register(SubscriptionService)
class SubscriptionServiceAdmin(admin.ModelAdmin):
    """Define admin model for SubscriptionService."""
    list_display = (
        'id',
        'name',
        'url_home',
        'type',
        'is_available',
    )

@admin.register(SubscriptionPlan)
class SubscriptionPlanAdmin(admin.ModelAdmin):
    """Define admin model for SubscriptionPlan."""
    list_display = (
        'id',
        'product_name',
        'amount',
        'billing_frequency',
        'maximum_size',
        'is_active',
    )


@admin.register(SubscriptionAccount)
class SubscriptionAccountAdmin(admin.ModelAdmin):
    """Define admin model for SubscriptionAccount."""
    list_display = (
        'id',
        'status_account',
        'responsible_user',
        'subscription_service',
        'subscription_plan',
        'date_created',
        'date_modified',
        'date_canceled'
    )

    readonly_fields = (
        'id',
    )

@admin.register(SubscriptionMember)
class SubscriptionMemberAdmin(admin.ModelAdmin):
    """Define admin model for SubscriptionMember."""
    list_display = (
        'id',
        'status_membership',
        'user',
        'subscription_account',
        'date_created',
        'date_modified',
        'date_canceled',
    )
    readonly_fields = (
        # 'user',
        # 'subscription_account',
        # 'status_membership',
        'date_created',
        'date_modified',
        'date_canceled',
    )


@admin.register(SubscriptionInvite)
class SubscriptionInviteAdmin(admin.ModelAdmin):
    """Define admin model for SubscriptionMember."""
    list_display = (
        'id',
        'subscription_account',
        'sender',
        'recipient_email',
        'processed'
    )
    readonly_fields = (
        'id',
    )
