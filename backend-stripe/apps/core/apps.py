from django.apps import AppConfig
from django.db.models.signals import post_save, pre_delete


class CoreConfig(AppConfig):
    name = 'core'
    
    def ready(self):
        from . import signals
        from core.models import User
        
        # post_save.connect(
        #     signals.create_stripe_customer,
        #     sender=User
        # )
        # post_save.connect(
        #     signals.create_stripe_customer_subscription,
        #     sender=StripeCustomer
        # )
        # pre_delete.connect(
        #     signals.delete_stripe_customer, 
        #     sender=StripeCustomer
        # )
    