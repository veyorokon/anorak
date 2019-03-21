from django.dispatch import receiver
from django.db.models.signals import post_save
# from subscription.models import SubscriptionAccount
from request.models import ManagementRequestOriginator, ManagementRequest

#Create a new management request on subscription account save
# @receiver(post_save, sender=SubscriptionAccount)
# def create_account_management_request(sender, instance, created, **kwargs):
#     if created:
#         ManagementRequest.objects.create(
#             subscription_account = instance,
#             subscription_member = instance.subscribers.first(),
#             originator = ManagementRequestOriginator.SERVER,
#         )
