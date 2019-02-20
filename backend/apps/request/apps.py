from django.apps import AppConfig
from django.db.models.signals import post_save


class RequestConfig(AppConfig):
    name = 'request'
    
    def ready(self):
        from . import signals
        from subscription.models import SubscriptionAccount
        post_save.connect(
            signals.create_account_management_request, 
            sender=SubscriptionAccount
        )