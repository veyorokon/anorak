from django.apps import AppConfig
from django.db.models.signals import post_save, pre_delete, post_delete

class CoreConfig(AppConfig):
    name = 'core'
    
    def ready(self):
        from . import signals
        from core.models import User
        from djstripe.models import Customer
        
        post_save.connect(
            signals.create_stripe_customer,
            sender=User
        )
        post_save.connect(
            signals.create_stripe_subscription,
            sender=Customer
        )
        post_delete.connect(
            signals.delete_stripe_customer, 
            sender=User
        )
    