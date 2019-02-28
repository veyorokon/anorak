from django.dispatch import receiver
from django.db.models.signals import post_save
from subscription.models import SubscriptionMember, SubscriptionAccount, MembershipStatus

#Create member for new account
@receiver(post_save, sender=SubscriptionAccount)
def create_account_subscription_member(sender, instance, created, **kwargs):
    if created:
        SubscriptionMember.objects.create(
            user = instance.responsible_user,
            subscription_account = instance,
            status_membership = MembershipStatus.PENDING_CREATED
        )
