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
    readonly_fields=('stripe_product_id',)

@admin.register(SubscriptionPlan)
class SubscriptionPlanAdmin(admin.ModelAdmin):
    """Define admin model for SubscriptionPlan."""
    readonly_fields=('stripe_plan_id',)

@admin.register(SubscriptionAccount)
class SubscriptionAccountAdmin(admin.ModelAdmin):
    """Define admin model for SubscriptionAccount."""
    def get_readonly_fields(self, request, obj=None):
        if obj:
            return self.readonly_fields + (
                'responsible_user',
            )
        return self.readonly_fields
    
@admin.register(SubscriptionMember)
class SubscriptionMemberAdmin(admin.ModelAdmin):
    """Define admin model for SubscriptionMember."""
    readonly_fields=('stripe_subscription_item_id',)
