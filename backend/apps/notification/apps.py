from django.apps import AppConfig
from django.db.models.signals import post_save, pre_delete, post_delete

class NotificationConfig(AppConfig):
    name = 'notification'

    def ready(self):
        pass
