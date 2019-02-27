from django.db import models
from core.models import User
from django.utils import timezone
from django_enumfield import enum
from encrypted_model_fields.fields import EncryptedCharField


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
    
    class Meta:
        db_table = "Subscription_Pricing_Plans"
        unique_together = ('service', 'amount','maximum_size')
        ordering = ['maximum_size']
    
    def save(self, *args, **kwargs):
        ''' 
        On save, update timestamps 
        '''
        if not self.id:
            self.date_created = timezone.now()
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
    TERMINATED = 0 # If we cancel their membership
    KICKED = 1 # If the responsible user cancels their membership
    CANCELED = 2 # If they cancel their membership
    PENDING = 3 # If the account needs to be processed
    INVITED = 4 # If the responsible user sent an invite
    ACTIVE = 5 # If the user has an active subscription membership
    

class SubscriptionMember(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="subscription_memberships")
    #The subscription account of which this is a member.
    subscription_account = models.ForeignKey(SubscriptionAccount, on_delete=models.CASCADE, related_name="subscribers")
    #The status of the user subscription 
    status_memberhip = enum.EnumField(MembershipStatus, default=MembershipStatus.PENDING)
    #Date that the subscription was created
    date_created = models.DateTimeField(editable=False)
    #Date that the subscription was modified
    date_modified = models.DateTimeField(editable=False)
    #Date that the subscription was created
    date_canceled = models.DateTimeField(editable=False, null=True, blank=True)
    
    def save(self, *args, **kwargs):
        ''' 
        On save, update timestamps 
        '''
        if not self.id:
            self.date_created = timezone.now()
        self.date_modified = timezone.now()
        return super(SubscriptionMember, self).save(*args, **kwargs)
    
    class Meta:
        db_table = "Subscriptions"