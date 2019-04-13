from django.apps import AppConfig
from django.db.models.signals import post_save, pre_delete, post_delete

class SubscriptionConfig(AppConfig):
    name = 'subscription'

    def ready(self):
        pass
