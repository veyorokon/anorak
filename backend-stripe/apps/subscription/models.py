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
from backend.utility import *
from backend.stripe import stripe
from backend.tax import tax_from_zip
from djstripe.models import *
from . managers import *
from . enum import *

##########################################################################
## Subscription Service
##########################################################################

class SubscriptionService(models.Model):
    #The encrypted secret. 
    name = models.CharField(max_length=128, null=False, unique=True)
    #The frequency of billing
    type = enum.EnumField(ServiceType, default=ServiceType.STREAMING)
    #the number of days for a free trial
    free_trial_days = models.IntegerField(default=0)
    #The url for home page 
    url_home = models.CharField(max_length=128, null=True)
    #The url for the terms of service.
    url_terms_of_service = models.CharField(max_length=128, null=True)
    #If the username is the email address
    is_username_email = models.BooleanField(default=False)
    #If this service is currently available for subscribers
    is_available = models.BooleanField(default=False)
    #The djstripe model webhook
    stripe_product_id = models.CharField(max_length=32)
    
    
    class Meta:
        db_table = "Subscription_Services"
        
    @property
    def djstripe_product(self):
        return Product.objects.get(id=self.stripe_product_id)
        
    def _init_stripe_product(self):
        product = stripe.Product.create(
            name=self.name,
            type='service',
        )
        self.stripe_product_id = product.id
    
    def _delete_stripe_product(self):
        product = stripe.Product.retrieve(
            self.stripe_product_id
        ).delete()
        
    def __str__(self):
        return self.name    
    
##########################################################################
## Subscription Plan
##########################################################################

class SubscriptionPlan(models.Model):
    #serice this pricing plan is attached to
    service = models.ForeignKey(SubscriptionService, on_delete=models.CASCADE, related_name="pricing_plans")
    #The current amount of the plan
    amount = models.FloatField(default=0.0)
    #If this is an actively available plan for the service
    is_active = models.BooleanField(default=False)
    #Date that the pricing plan was canceled and updated
    date_canceled = models.DateTimeField(editable=False, null=True, blank=True)
    #The frequency of billing
    billing_frequency = enum.EnumField(PlanBillingFrequency, default= PlanBillingFrequency.MONTH)
    #Maximum size for the service
    maximum_size = models.IntegerField(default=None, null=True, blank=True)
    #The stripe plan for this service
    stripe_plan_id = models.CharField(max_length=32)


    class Meta:
        db_table = "Subscription_Plans"
        unique_together = ('service', 'amount','maximum_size')
        ordering = ['maximum_size']
    
    @property
    def djstripe_plan(self):
        return Plan.objects.get(id=self.stripe_plan_id)
    
    @property
    def product_name(self):
        name = self.service.name
        if self.maximum_size > 1:
            return name + ' - Family Plan ('+str(self.maximum_size)+' users)'
        return name + ' - Individual Plan'
        
    def _delete_stripe_plan(self):
        stripe.Plan.retrieve(
            self.stripe_plan_id
        ).delete()
        
    def _init_stripe_plan(self):
        name = self.product_name
        nickname = self.__str__()
        plan = stripe.Plan.create(
            amount = int(self.amount*100),
            product = {
                'name': name
            },
            interval="month",
            currency="usd",
            nickname=nickname
        )
        self.stripe_plan_id = plan.id
    
    def __str__(self):
        return self.product_name +": $"+str(self.amount)+" billed monthly"


##########################################################################
## Subscription Account
##########################################################################

class SubscriptionAccount(models.Model):
    #The type of the account
    type = enum.EnumField(SubscriptionAccountType, default=SubscriptionAccountType.CREATE)
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
    date_created = models.DateTimeField(editable=False)
    #Date that the subscription was modified
    date_modified = models.DateTimeField(editable=False)
    #Date that the subscription was canceled
    date_canceled = models.DateTimeField(editable=False, null=True, blank=True)

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
        
    def save(self, *args, **kwargs):
        ''' 
        On save, update timestamps 
        '''
        if not self.id:
            self.date_created = timezone.now()
        self.date_modified = timezone.now()
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
    date_created = models.DateTimeField(editable=False)
    #Date that the subscription was modified
    date_modified = models.DateTimeField(editable=False)
    #Date that the subscription was created
    date_canceled = models.DateTimeField(editable=False, null=True, blank=True)
    #The stripe subscription item id
    stripe_subscription_item_id = models.CharField(max_length=32, null=True, blank=True)
    
    
    def _cancel_stripe_subscription(self):
        subscriptionID = self.stripe_subscription_item_id
        if subscriptionID == None:
            raise ValueError("Stripe subscription item id is not set!")
        si = stripe.SubscriptionItem.retrieve(subscriptionID)
        si.delete()

    def _cancel_membership_status(self):
        self.status_membership = MembershipStatus.CANCELED
    
    def _set_stripe_subscription_item_id(self, subscription=None):
        planID = self.subscription_account.subscription_plan.stripe_plan_id
        itemID = None
        for subscriptionItem in subscription['items']['data']:
            if subscriptionItem.plan.id == planID:
                itemID = subscriptionItem.id
        self.stripe_subscription_item_id = itemID

    def get_existing_subscription_items(self):
        return self.user.djstripe_subscription.items.all()
    
    def _validate_subscription_item(self, item):
        try:
            stripe.SubscriptionItem.retrieve(
                item.id
            )
            return True
        except:
            return False

    def get_subscription(self):
        return self.user.djstripe_subscription
    
    def add_to_stripe_subscription(self):
        subscription = self.user.djstripe_subscription
        planID = self.subscription_account.subscription_plan.stripe_plan_id
        existingItems = self.get_existing_subscription_items()
        updatedItems = []
        newItem = {'plan': planID}
        for item in existingItems:
            if self._validate_subscription_item(item):
                updatedItems.append({
                    'id':item.id
                })
        #Can delete invalid here
        updatedItems.append(newItem)
        zip = self.user.get_shipping_zip()
        taxPercent = tax_from_zip(zip) * 100
        updated = stripe.Subscription.modify(
            subscription.id, 
            items=updatedItems, 
            billing_cycle_anchor='unchanged',
            tax_percent=taxPercent,
        )
        self._set_stripe_subscription_item_id(subscription=updated)

    def cancel(self):
        if self.stripe_subscription_item_id:
            self._cancel_stripe_subscription()
        self._cancel_membership_status()

    def save(self, *args, **kwargs):
        ''' 
        On save, update timestamps 
        '''
        if not self.id:
            self.date_created = timezone.now()
        if self.subscription_account.type != SubscriptionAccountType.CONNECT:
            self.add_to_stripe_subscription()
        self.date_modified = timezone.now()
        return super(SubscriptionMember, self).save(*args, **kwargs)

    class Meta:
        db_table = "Subscriptions"
