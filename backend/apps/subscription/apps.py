from django.apps import AppConfig
from django.db.models.signals import post_save, pre_delete

class SubscriptionConfig(AppConfig):
    name = 'subscription'
    
    def ready(self):
        from . import signals
        from subscription.models import SubscriptionAccount, SubscriptionMember, SubscriptionPricingPlan
        post_save.connect(
            signals.create_account_subscription_member, 
            sender=SubscriptionAccount
        )
        post_save.connect(
            signals.create_invoice_item,
            sender=SubscriptionMember
        )
        pre_delete.connect(
            signals.delete_stripe_plan,
            sender=SubscriptionPricingPlan
        )
        pre_delete.connect(
            signals.delete_subscription_membership,
            sender=SubscriptionMember
        )