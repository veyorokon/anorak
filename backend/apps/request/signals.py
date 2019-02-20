from django.db.models.signals import post_save
from django.dispatch import receiver
from request.models import 
from subscription.models import SubscriptionAccount

#Create a new management request on subscription account save
@receiver(post_save, sender=SubscriptionAccount)
def create_account_management_request(sender, instance, created, **kwargs):
    if created:
        #Create request for new account
        pass