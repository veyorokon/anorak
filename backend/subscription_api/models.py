import uuid
from core.models import User
from django.db import models
from django.conf import settings
from django.utils import timezone
from django_enumfield import enum
from django.dispatch import receiver
from django.db.models.signals import post_save, pre_save, pre_delete

import stripe
stripe.api_key = settings.STRIPE_ACCOUNT_SID

# Frequency of subscription billing
class Frequency(enum.Enum):
    DAY = 0
    WEEK = 1
    MONTH = 2
    
    
# Subscription service provided
class StripePlan(models.Model):
    #The stripe plan id
    stripe_plan_id = models.CharField(max_length=32, null=True, blank=True)
    #The frequency of billing
    billing_frequency = enum.EnumField(Frequency, default=Frequency.MONTH)
    #The SquadUp fee if any
    cost_service_fee = models.FloatField(default=0)
    #Any taxes associated with the cost of the service
    tax_rate = models.FloatField(default=0)
    #The gross total amount before tax and fees
    cost_gross_total = models.FloatField(default=0)
    #The net total amount after tax and fees
    cost_net_total = models.FloatField(default=0)
    
    def create_stripe_plan(self, name, cost_price, *args, **kwargs):
        """
        Creates a stripe pricing plan attached to global squadup product
        """
        if not self.id:
            stripe_plan_id = stripe.Plan.create(
                id=name,
                amount=cost_price,
                interval="month",
                product=settings.STRIPE_SQUADUP_PRODUCT,
                currency="usd",
            )
            self.stripe_plan_id = stripe_plan_id.id
            
            return super(StripePlan, self).save(*args, **kwargs)
        else:
            raise ValueError('Stripe plan could not be created')
                    
            
    def delete_plan(self):
        """
        Deletes the pricing plan on Stripe's database
        """
        plan = stripe.Plan.retrieve(self.stripe_plan_id)
        plan.delete()


# Contains a Stripe product. 
class Squad(models.Model):
    #User who owns this subscription product
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    #The login username for this service
    username = models.CharField(max_length=128, null=False)
    #Squad description for this service
    password = models.CharField(max_length=128, null=False)
    #Squad description
    service = models.CharField(max_length=12, null=True)
    #The base price charged to SquadUp
    cost_price = models.IntegerField(null=False)
    #Squad maximum size
    maximum_size = models.IntegerField(default=10)
    #Squad maximum size
    current_size = models.IntegerField(default=0)
    #Date that the subscription was created
    date_created = models.DateTimeField(editable=False)
    #Date that the subscription was created
    date_modified = models.DateTimeField(editable=False)
    #The stripe plan for this squad
    stripe_plan = models.OneToOneField(StripePlan, default=None, 
        null=True, on_delete=models.CASCADE, related_name='squad')
        
    
    def save(self, *args, **kwargs):
        ''' 
        On save, update timestamps 
        '''
        if not self.id:
            self.date_created = timezone.now()
        self.date_modified = timezone.now()
        return super(Squad, self).save(*args, **kwargs)
        
        
# Frequency of subscription billing
class SquadMemberStatus(enum.Enum):
    OWNER = 0
    PENDING = 1
    SUBSCRIBED = 2

# Contains a stripe subscription
class SquadMember(models.Model):
    #User who owns this subscription
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    #User who owns this subscription
    squad = models.ForeignKey(Squad, on_delete=models.CASCADE, null=True)
    #The frequency of billing
    status = enum.EnumField(SquadMemberStatus, default=SquadMemberStatus.PENDING)
    #The stripe subscription id
    stripe_subscription_id = models.CharField(max_length=32, null=True, 
        blank=True)
    #Date that the user joined the subscription
    date_joined = models.DateTimeField(editable=False)
    #Date that the user left the subscription
    date_left = models.DateTimeField(null=True, blank=True, editable=True)
    
    
    def create_squad_owner_membership(self, squad, *args, **kwargs):
        """
        Creates a special membership for squad owners
        """
        self.status = SquadMemberStatus.OWNER
        self.user = squad.owner
        self.squad = squad
        self.date_joined = timezone.now()
        return super(SquadMember, self).save(*args, **kwargs)
        
        
    @property
    def service(self):
        return self.squad.service    
        
    @property
    def price(self):
        return float(self.squad.cost_price)/100
        
    @property
    def plan_name(self):
        return self.squad.service+'_'+str(self.squad.id)  
        
    @property
    def current_size(self):
        return self.squad.current_size
        
    @property
    def maximum_size(self):
        return self.squad.maximum_size



#################################################
#############    MODEL SIGNALS   ################
#################################################

# Signals for Squad model.
@receiver(post_save, sender=Squad)
def create_stripe_plan(sender, instance=None, created=False, **kwargs):
    """
    Handles the creation of Squad related instances
    of plans and owner memberships.
    """
    if created:
        try:
            squadMember = SquadMember()
            squadMember.create_squad_owner_membership(instance)
            stripe_plan = StripePlan()
            stripe_plan.create_stripe_plan(
                name=instance.service+'_'+str(instance.id),
                cost_price=instance.cost_price
            )
            instance.stripe_plan = stripe_plan
            instance.save()
        except:
            instance.delete()
            raise ValueError('Squad could not be created')

# Signals for Squad model to delete Stripe objects
@receiver(pre_delete, sender=Squad)
def delete_stripe_plan(sender, instance=None, **kwargs):
    try:
        instance.stripe_plan.delete_plan()
        instance.stripe_plan.delete()
    except:
        pass
        