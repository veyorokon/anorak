from django.dispatch import receiver
from django.db.models.signals import post_save, pre_delete
from subscription.models import SubscriptionMember, SubscriptionAccount, MembershipStatus, SubscriptionPricingPlan
from accounting.models import Invoice
from accounting.email import *

#Create member for new account
@receiver(post_save, sender=SubscriptionAccount)
def create_account_subscription_member(sender, instance, created, **kwargs):
    if created:
        if instance.is_connected_account:
            member = SubscriptionMember.objects.create(
                user = instance.responsible_user,
                subscription_account = instance,
                status_membership = MembershipStatus.PENDING_CONNECT
            )
        else:
            member = SubscriptionMember.objects.create(
                user = instance.responsible_user,
                subscription_account = instance,
                status_membership = MembershipStatus.PENDING_CREATE
            )


#Create invoice and email receipt
@receiver(post_save, sender=SubscriptionMember)
def create_invoice(sender, instance, created, **kwargs):
    if created:
        invoice = Invoice.objects.get_or_create_this_month(
            user = instance.user
        )
        invoice.save() # Triggers the invoice update
    else:
        invoice = Invoice.objects.get(user=instance.user)
        invoice.save() # Triggers the invoice update
    
    
# Delete the Stripe customer from the model
@receiver(pre_delete, sender=SubscriptionPricingPlan)
def delete_stripe_plan(sender, instance=None, **kwargs):
    try:
        instance.delete_stripe_plan()
    except:
        pass

# Delete the Stripe customer from the model
@receiver(pre_delete, sender=SubscriptionMember)
def delete_subscription_membership(sender, instance=None, **kwargs):
    try:
        instance.cancel()
        invoice = Invoice.objects.get(user=instance.user).order_by('-id')[0]
        invoice.sync_with_stripe_or_finalize() # Triggers the invoice update
        invoice.save()
    except:
        pass