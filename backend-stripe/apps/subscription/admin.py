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
        'stripe_product_id',
    )
    readonly_fields=('stripe_product_id',)

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
        'stripe_plan_id',
    )
    readonly_fields=('stripe_plan_id',)

@admin.register(SubscriptionAccount)
class SubscriptionAccountAdmin(admin.ModelAdmin):
    """Define admin model for SubscriptionAccount."""
    list_display = (
        'id',
        'status_account',
        'type',
        'responsible_user',
        'subscription_service',
        'subscription_plan',
        'date_created', 
        'date_modified',
        'date_canceled'
    )
    
    readonly_fields = (
        'id',
        'type',
        'responsible_user',
        'subscription_service',
        'subscription_plan',
        'status_account',
        'date_created', 
        'date_modified',
        'date_canceled',
        'username',
        'password',
    )

    def get_readonly_fields(self, request, obj=None):
        if obj:
            return self.readonly_fields + (
                'responsible_user',
            )
        return self.readonly_fields
    
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
        'stripe_subscription_item_id',
    )
    readonly_fields = (
        'user',
        'subscription_account',
        'status_membership',
        'date_created', 
        'date_modified',
        'date_canceled',
        'stripe_subscription_item_id',
    )
