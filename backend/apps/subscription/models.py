from django.db import models
from core.models import User
from django.conf import settings
from django.utils import timezone
from django_enumfield import enum
from encrypted_model_fields.fields import EncryptedCharField
from backend.utility import *

import stripe
stripe.api_key = settings.STRIPE_ACCOUNT_SID

# Frequency of subscription billing
class ServiceType(enum.Enum):
    STREAMING = 0
    BOX = 1
    MEMBERSHIP = 2
    
    class Meta:
        managed = False


class SubscriptionService(models.Model):
    #The encrypted secret. 
    name = models.CharField(max_length=128, null=False)
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
    #Date that the service was created
    date_created = models.DateTimeField(editable=False)
    #Date that the service was modified
    date_modified = models.DateTimeField(editable=False)
    #If this service is currently available for subscribers
    is_available = models.BooleanField(default=False)
    
    class Meta:
        db_table = "Subscription_Services"
        
    
    def save(self, *args, **kwargs):
        ''' 
        On save, update timestamps 
        '''
        if not self.id:
            self.date_created = timezone.now()
        self.date_modified = timezone.now()
        return super(SubscriptionService, self).save(*args, **kwargs)
        
    def __str__(self):
        return self.name

# Frequency of subscription billing
class PlanBillingFrequency(enum.Enum):
    DAY = 0
    WEEK = 1
    MONTH = 2
    
class SubscriptionPricingPlan(models.Model):
    #serice this pricing plan is attached to
    service = models.ForeignKey(SubscriptionService, on_delete=models.CASCADE, related_name="pricing_plans")
    #The current amount of the plan
    amount = models.FloatField(default=0.0)
    #The option to void the invoice
    is_active = models.BooleanField(default=False)
    #Date that the pricing plan was created
    date_created = models.DateTimeField(editable=False)
    #Date that the pricing plan was modified
    date_modified = models.DateTimeField(editable=False)
    #Date that the pricing plan was canceled and updated
    date_canceled = models.DateTimeField(editable=False, null=True, blank=True)
    #The frequency of billing
    billing_frequency = enum.EnumField(PlanBillingFrequency, default=PlanBillingFrequency.MONTH)
    #Maximum size for the service
    maximum_size = models.IntegerField(default=None, null=True, blank=True)
    #The stripe product for this service
    stripe_plan = models.CharField(max_length=32, blank=True, editable=False)
    
    class Meta:
        db_table = "Subscription_Pricing_Plans"
        unique_together = ('service', 'amount','maximum_size')
        ordering = ['maximum_size']
        
    def get_stripe_plan(self):
        return stripe.Plan.retrieve(self.stripe_plan)
        
    def get_stripe_product(self):
        product = self.get_stripe_plan().product
        return stripe.Product.retrieve(product)
        
    def get_product_name(self):
        name = self.service.name
        if self.maximum_size > 1:
            return name + ' - Family Plan ('+str(self.maximum_size)+' users)'
        return name + ' - Individual Plan'
        
    def create_stripe_plan(self):
        name = self.get_product_name()
        plan = stripe.Plan.create(
            amount = int(self.amount*100),
            product = {
                'name': name
            },
            interval="month",
            currency="usd",
        )
        self.stripe_plan = plan.id
    
    def delete_stripe_plan(self):
        product = self.get_stripe_product()
        plan = stripe.Plan.retrieve(self.stripe_plan)
        plan.delete()
        product.delete()
        
    
    def save(self, *args, **kwargs):
        ''' 
        On save, update timestamps 
        '''
        if not self.id:
            self.date_created = timezone.now()
            self.create_stripe_plan()
        self.date_modified = timezone.now()
        return super(SubscriptionPricingPlan, self).save(*args, **kwargs)
        
            
    def __str__(self):
        return str(self.service) +": "+str(self.amount)+" billed monthly"


# Status for the subscription account
class SubscriptionAccountStatus(enum.Enum):
    TERMINATED = 0
    CANCELED = 1
    PENDING = 2
    ACTIVE = 3
    
    
class SubscriptionAccount(models.Model):
    #User who is responsible and pays if other members miss.
    responsible_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="subscription_accounts")
    #User who owns this subscription
    service = models.ForeignKey(SubscriptionService, on_delete=models.CASCADE, related_name="subscription_accounts")
    #User who owns this subscription
    price_plan = models.ForeignKey(SubscriptionPricingPlan, on_delete=models.PROTECT, related_name="subscription_accounts", null=True,)
    #The encrypted username
    username = EncryptedCharField(max_length=128, null=True, blank=True)
    #The encrypted password. 
    password = EncryptedCharField(max_length=128, null=True, blank=True)
    #The status of the account
    status_account = enum.EnumField(SubscriptionAccountStatus, default=SubscriptionAccountStatus.PENDING)
    #If any member has an outstanding balance on this account
    has_outstanding_balance = models.BooleanField(default=False)
    #Date that the subscription was created
    date_created = models.DateTimeField(editable=False)
    #Date that the subscription was modified
    date_modified = models.DateTimeField(editable=False)
    #Date that the subscription was created
    date_canceled = models.DateTimeField(editable=False, null=True, blank=True)
    
    class Meta:
        db_table = "Subscription_Accounts"
            
    def save(self, *args, **kwargs):
        ''' 
        On save, update timestamps 
        '''
        if not self.id:
            self.date_created = timezone.now()
        self.date_modified = timezone.now()
        return super(SubscriptionAccount, self).save(*args, **kwargs)


# Status for the subscription account
class MembershipStatus(enum.Enum):
    PAYMENT_FAILED = 0 # If their payment has failed
    KICKED = 1 # If the responsible user cancels their membership
    CANCELED = 2 # If they cancel their membership
    PENDING = 3 # General Pending State
    PENDING_INVITED = 4 # If the responsible user sent an invite
    PENDING_CREATED = 5 # If the account needs to be processed
    PENDING_UPDATING = 6 # If the account is being updated
    ACTIVE = 7 # If the user has an active subscription membership
    
    def validate(self, status):
        if(status >= self.PENDING_CREATED):
            return True
        return False
    

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
    stripe_subscription_item_id = models.CharField(max_length=32, null=True)
    
    def get_existing_subscription_items(self):
        subscriptionItems = []
        subscriptions = self.user.stripe_customer.get_stripe_subscription()
        for subscriptionItem in subscriptions['items']['data']:
            subscriptionItems.append(subscriptionItem.id)
        return subscriptionItems
        
    def get_subscription(self):
        return self.user.stripe_customer.get_stripe_subscription()
        
    def set_stripe_subscription_item_id(self, subscriptions=None):
        if subscriptions == None:
            subscriptions = self.get_subscription()
        planID = self.subscription_account.price_plan.stripe_plan
        itemID = None
        for subscriptionItem in subscriptions['items']['data']:
            if subscriptionItem['plan'].id == planID:
                itemID = subscriptionItem.id
        self.stripe_subscription_item_id = itemID
            
    def add_to_stripe_subscription(self):
        subscription = self.user.stripe_customer.stripe_subscription_id
        planID = self.subscription_account.price_plan.stripe_plan
        existingItems = self.get_existing_subscription_items()
        updatedItems = []
        newItem = {'plan': planID}
        for item in existingItems:
            updatedItems.append({
                'id':item
            })
        updatedItems.append(newItem)
        
        updated = stripe.Subscription.modify(
            subscription, 
            items=updatedItems, 
            billing_cycle_anchor='unchanged'
        )
        self.set_stripe_subscription_item_id(subscriptions=updated)
        
    def _cancel_stripe_subscription(self):
        subscriptionID = self.stripe_subscription_item_id
        if subscriptionID == None:
            raise ValueError("Stripe subscription item id is not set!")
        si = stripe.SubscriptionItem.retrieve(subscriptionID)
        si.delete()
        
    def _cancel_membership_status(self):
        self.status_membership = MembershipStatus.CANCELED
        
    def cancel(self):
        self._cancel_stripe_subscription()
        self._cancel_membership_status()
    
    def save(self, *args, **kwargs):
        ''' 
        On save, update timestamps 
        '''
        if not self.id:
            self.date_created = timezone.now()
            self.add_to_stripe_subscription()
        self.date_modified = timezone.now()
        return super(SubscriptionMember, self).save(*args, **kwargs)
    
    class Meta:
        db_table = "Subscriptions"