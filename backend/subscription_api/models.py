from django.db import models
from django.conf import settings
from django.utils import timezone
from django_enumfield import enum


class Squad(models.Model):
    #User who owns this subscription product
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, related_name='owner')
    #Squad name
    name = models.CharField(max_length=32, null=True)
    #Squad description
    description = models.CharField(max_length=64, null=True)
    #Date that the subscription was created
    date_created = models.DateTimeField(editable=False)
    #Date that the subscription was created
    date_modified = models.DateTimeField(editable=False)
    #Date that the start date for the subscription
    date_subscription_start = models.DateTimeField(blank=True,
        null=True, editable=True)
    #The stripe product id
    stripe_product_id = models.CharField(max_length=32, null=True, blank=True)
    
    def save(self, *args, **kwargs):
        ''' 
        On save, update timestamps 
        '''
        if not self.id:
            self.date_created = timezone.now()
        self.date_modified = timezone.now()
        return super(Squad, self).save(*args, **kwargs)


class SquadDashboardElement(models.Model):
    #The squad that the user has added to their dashboard
    squad = models.ForeignKey(Squad, on_delete=models.CASCADE)
    #The user this dashboard belongs to 
    user = models.ForeignKey(settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE)


# Frequency of subscription billing
class Frequency(enum.Enum):
    DAILY = 0
    WEEKLY = 1
    BIWEEKLY = 2
    MONTHLY = 3
    
    
# Subscription service provided
class StripePlan(models.Model):
    #The user this dashboard belongs to 
    squad = models.OneToOneField(Squad, 
        on_delete=models.CASCADE, related_name='stripe_plan')
    #The stripe plan id
    stripe_plan_id = models.CharField(max_length=32, null=True, blank=True)
    #The frequency of billing
    billing_frequency = enum.EnumField(Frequency, default=Frequency.MONTHLY)
    #The base price charged to SquadUp
    cost_price = models.FloatField(null=True)
    #The SquadUp fee if any
    cost_service_fee = models.FloatField(default=0)
    #Any taxes associated with the cost of the service
    tax_rate = models.FloatField(default=0)
    #The gross total amount before tax and fees
    cost_gross_total = models.FloatField(default=0)
    #The net total amount after tax and fees
    cost_net_total = models.FloatField(default=0)
    

# Subscription service provided
class StripeSubscription(models.Model):
    #The stripe plan
    stripe_plan = models.ForeignKey(StripePlan, on_delete=models.CASCADE)
    #The stripe plan id
    stripe_subscription_id = models.CharField(max_length=32, null=True, 
        blank=True)
        
        
class SquadMember(models.Model):
    #User who owns this subscription
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    #User who owns this subscription
    squad = models.ForeignKey(Squad, on_delete=models.CASCADE)
    #Squad description
    stripe_subscription = models.OneToOneField(StripeSubscription, 
        on_delete=models.CASCADE, related_name='squad_member', null=True)
    #Date that the user joined the subscription
    date_joined = models.DateTimeField(editable=False)
    #Date that the user left the subscription
    date_left = models.DateTimeField(null=True, blank=True, editable=True)
    
    def save(self, *args, **kwargs):
        ''' 
        Keep track of date the user joined this squad
        '''
        if not self.id:
            self.date_joined = timezone.now()
        return super(SquadMember, self).save(*args, **kwargs)