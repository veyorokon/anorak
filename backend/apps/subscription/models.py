"""
Custom subscription models
"""

##########################################################################
## Imports
##########################################################################
from django.db import models
from core.models import User
from django.utils import timezone
from encrypted_model_fields.fields import EncryptedCharField
from django.db.models import Q
from djstripe.models import *
from backend.utility import *
from backend.stripe import stripe
from backend.tax import tax_from_zip
from . managers import *
from . enum import *

##########################################################################
## Subscription Service
##########################################################################

class SubscriptionService(models.Model):
    #The encrypted secret.
    name = models.CharField(max_length=128, null=False, unique=True)
    #Tag line and slogan
    tag_line = models.CharField(max_length=128, null=True, blank=True)
    #The description
    description = models.CharField(max_length=256, null=True, blank=True)
    #The frequency of billing
    type = enum.EnumField(ServiceType, default=ServiceType.STREAMING)
    #the number of days for a free trial
    free_trial_days = models.IntegerField(default=0)
    #The url for home page
    url_home = models.CharField(max_length=128, null=True)
    #The url for the signup
    url_signup = models.CharField(max_length=128, null=True, blank=True)
    #The url for the terms of service.
    url_terms_of_service = models.CharField(max_length=128, null=True)
    #If the username is the email address
    is_username_email = models.BooleanField(default=False)
    #If this service is currently available for subscribers
    is_available = models.BooleanField(default=False)

    class Meta:
        db_table = "Subscription_Services"

    def __str__(self):
        return self.name


##########################################################################
## Subscription Plan
##########################################################################

class SubscriptionPlan(models.Model):
    #serice this pricing plan is attached to
    service = models.ForeignKey(SubscriptionService, on_delete=models.CASCADE, related_name="pricing_plans")
    #The description
    description = models.CharField(max_length=128, null=False, blank=True)
    #The current amount of the plan
    amount = models.FloatField(default=0.0)
    #If this is an actively available plan for the service
    is_active = models.BooleanField(default=False)
    #Date that the pricing plan was canceled and updated
    date_canceled = models.IntegerField(editable=False, null=True, blank=True)
    #The frequency of billing
    billing_frequency = enum.EnumField(PlanBillingFrequency, default= PlanBillingFrequency.MONTH)
    #Maximum size for the service
    maximum_size = models.IntegerField(default=None, null=True)


    class Meta:
        db_table = "Subscription_Plans"
        unique_together = ('service', 'amount','maximum_size')
        ordering = ['maximum_size']

    @property
    def product_name(self):
        name = self.service.name
        if self.maximum_size > 1:
            return name + ' - Family Plan ('+str(self.maximum_size)+' users)'
        return name + ' - Individual Plan'

    def __str__(self):
        return self.product_name + " $"+str(self.amount)+" billed monthly"


##########################################################################
## Subscription Account
##########################################################################

class SubscriptionAccount(models.Model):
    #The type of the account
    type = enum.EnumField(SubscriptionAccountType, default=SubscriptionAccountType.CREATE, editable=False)
    #User who is responsible and pays if other members miss.
    responsible_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="subscription_accounts")
    #The service this account is for
    subscription_service = models.ForeignKey(SubscriptionService, on_delete=models.CASCADE, related_name="subscription_accounts")
    #The price plan this account has
    subscription_plan = models.ForeignKey(SubscriptionPlan, on_delete=models.CASCADE, related_name="subscription_accounts", null=True)
    #The encrypted username
    username = EncryptedCharField(max_length=128, null=True, blank=True)
    #The encrypted password.
    password = EncryptedCharField(max_length=128, null=True, blank=True)
    #The status of the account
    status_account = enum.EnumField(SubscriptionAccountStatus, default=SubscriptionAccountStatus.PENDING)
    #Date that the subscription was created
    date_created = models.IntegerField(editable=False)
    #Date that the subscription was modified
    date_modified = models.IntegerField(editable=False)
    #Date that the subscription was canceled
    date_canceled = models.IntegerField(editable=False, null=True, blank=True)

    class Meta:
        db_table = "Subscription_Accounts"
        unique_together = (
            'responsible_user',
            'subscription_service',
            'subscription_plan'
        )

    @property
    def responsible_member(self):
        try:
            return SubscriptionMember.objects.get(
                user = self.responsible_user,
                subscription_account = self
            )
        except:
            return None

    @property
    def basic_members(self):
        return self.subscribers.all().filter(~Q(
            user = self.responsible_user
        ))

    def _create(self):
        self.status_account = SubscriptionAccountStatus.ACTIVE
        SubscriptionMember.objects.create(
            user=self.responsible_user,
            subscription_account=self,
            status_membership = MembershipStatus.ACTIVE
        )

    def _connect(self, confirmRequired=False):
        self.status_account = SubscriptionAccountStatus.PENDING_CONFIRM_CONNECT
        if not confirmRequired:
            self.status_account = SubscriptionAccountStatus.CONNECTED

    def _cancel_basic_members(self):
        for member in self.basic_members:
            member.delete()

    def _cancel_responsible_member(self):
        self.responsible_member.cancel()

    def _set_plan(self, plan):
        self.subscription_plan = plan

    def connect(self, plan):
        self._set_plan(plan)
        self.activate()

    def activate(self):
        if self.type == SubscriptionAccountType.CREATE:
            self._create()
        else:
            self._connect()
        self.save()

    def cancel(self):
        self._cancel_basic_members()
        self._cancel_responsible_member()
        self.status_account = SubscriptionAccountStatus.CANCELED
        self.save()

    def validate_user(self, user):
        if user == self.responsible_user:
            return True
        try:
            membershipStatus = SubscriptionMember.objects.get(
                subscription_account = self,
                user = user
            ).status_membership
            validated = MembershipStatus.validate(membershipStatus)
            return validated
        except:
            pass
        return False

    def save(self, *args, **kwargs):
        '''
        On save, update timestamps
        '''
        if not self.id:
            self.date_created = get_current_epoch()
        self.date_modified = get_current_epoch()
        return super(SubscriptionAccount, self).save(*args, **kwargs)

    def __str__(self):
        user = self.responsible_user.email
        plan = str(self.subscription_plan)
        type = SubscriptionAccountType.label(self.type).lower().capitalize()
        return user +"\'s "+ plan + ' - '+type+' Account'

class CreateAccount(SubscriptionAccount):
    objects = CreateAccountManager()
    class Meta:
        proxy = True

class ConnectAccount(SubscriptionAccount):
    objects = ConnectAccountManager()
    class Meta:
        proxy = True


##########################################################################
## Subscription Membership
##########################################################################

class SubscriptionMember(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="subscription_memberships")
    #The subscription account of which this is a member.
    subscription_account = models.ForeignKey(SubscriptionAccount, on_delete=models.CASCADE, related_name="subscribers")
    #The status of the user subscription
    status_membership = enum.EnumField(MembershipStatus, default=MembershipStatus.PENDING)
    #Date that the subscription was created
    date_created = models.IntegerField(editable=False)
    #Date that the subscription was modified
    date_modified = models.IntegerField(editable=False)
    #Date that the subscription was created
    date_canceled = models.IntegerField(editable=False, null=True, blank=True)


    def _cancel_membership_status(self):
        self.status_membership = MembershipStatus.CANCELED

    def cancel(self):
        self._cancel_membership_status()
        self.save()

    def save(self, *args, **kwargs):
        '''
        On save, update timestamps
        '''
        if not self.id:
            self.date_created = get_current_epoch()
        self.date_modified = get_current_epoch()
        return super(SubscriptionMember, self).save(*args, **kwargs)

    class Meta:
        db_table = "Subscriptions"
        unique_together = (
            'user',
            'subscription_account'
        )


##########################################################################
## Subscription Invite
##########################################################################

class SubscriptionInvite(models.Model):
    #The account the invite is for
    subscription_account = models.ForeignKey(SubscriptionAccount, on_delete=models.CASCADE, related_name="invites")
    #The user this invite is from
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="invites_sent")
    #The user this invite is for
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name="invites_received", null=True, blank=True)
    #The user email this invite is for - use email bc usr might not exist
    recipient_email = models.CharField(max_length=128, null=False)
    #Date that the subscription was created
    date_created = models.IntegerField(editable=False)
    #Date that the subscription was modified
    date_modified = models.IntegerField(editable=False)
    #If this has been processed or not
    processed = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        '''
        On save, update timestamps
        '''
        if not self.id:
            self.date_created = get_current_epoch()
        self.date_modified = get_current_epoch()
        return super(SubscriptionInvite, self).save(*args, **kwargs)
