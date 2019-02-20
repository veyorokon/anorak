from django.apps import AppConfig
from django.db.models.signals import post_save

class SubscriptionConfig(AppConfig):
    name = 'subscription'
    
    def ready(self):
        from . import signals
        from subscription.models import SubscriptionAccount
        post_save.connect(
            signals.create_account_subscription_member, 
            sender=SubscriptionAccount
        )