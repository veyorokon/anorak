from django.apps import AppConfig
from django.db.models.signals import post_save, pre_delete, post_delete

class SubscriptionConfig(AppConfig):
    name = 'subscription'
    
    def ready(self):
        from . import signals
        from djstripe.models import WebhookEventTrigger
        from subscription.models import SubscriptionService, SubscriptionPlan, SubscriptionMember
        
        post_save.connect(
            signals.create_stripe_product, 
            sender=SubscriptionService,
        )
        pre_delete.connect(
            signals.delete_stripe_product,
            sender=SubscriptionService,
        )
        
        post_save.connect(
            signals.create_stripe_plan, 
            sender=SubscriptionPlan,
        )
        pre_delete.connect(
            signals.delete_stripe_plan,
            sender=SubscriptionPlan,
        )
        
        pre_delete.connect(
            signals.delete_stripe_subscription_item,
            sender=SubscriptionMember,
        )
        
        post_save.connect(
            signals.trigger_refund_email, 
            sender=WebhookEventTrigger,
        )
        
        
        