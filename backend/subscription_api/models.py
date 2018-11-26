import uuid
from core.models import User
from django.db import models
from django.conf import settings
from django.utils import timezone
from django_enumfield import enum
from django.dispatch import receiver
from encrypted_model_fields.fields import EncryptedCharField
from django.db.models.signals import post_save, pre_save, pre_delete, post_delete

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
    #The SquadUp percent fee if any
    cost_cc_percent_fee = models.FloatField(default=0.03)
    #The SquadUp constant fee
    cost_cc_constant_fee = models.FloatField(default=0.5)
    #Any taxes associated with the cost of the service
    tax_rate = models.FloatField(default=0)
    
    def create_stripe_plan(self, cost_price, *args, **kwargs):
        """
        Creates a stripe pricing plan attached to global squadup product
        """
        if not self.id:
            stripe_plan_id = stripe.Plan.create(
                amount=cost_price,
                interval="month",
                product=settings.STRIPE_SQUADUP_PRODUCT,
                currency="usd",
            )
            self.stripe_plan_id = stripe_plan_id.id
            
            return super(StripePlan, self).save(*args, **kwargs)
        else:
            raise ValueError('Stripe plan could not be created')
    
    def get_stripe_plan(self):
        return stripe.Plan.retrieve(self.stripe_plan_id)
            
    def delete_plan(self):
        """
        Deletes the pricing plan on Stripe's database
        """
        plan = self.get_stripe_plan()
        plan.delete()
        

# Contains a Stripe product. 
class Squad(models.Model):
    #User who owns this subscription product
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    #The encrypted secret. 
    description = models.CharField(max_length=128, null=True)
    #The encrypted secret. 
    secret = EncryptedCharField(max_length=128, null=True)
    #Squad description
    service = models.CharField(max_length=16, null=True)
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
    is_public = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    
    @property
    def squad_service_id(self):
        return self.stripe_plan.stripe_plan_id
        
    def deactivate(self,  *args, **kwargs):
        for member in self.members.filter(status=SquadMemberStatus.SUBSCRIBED):
            member.deactivate_membership(wasTerminated=True)
        self.is_active = False
        return super(Squad, self).save(*args, **kwargs)
        
    
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
    BANNED = 0
    KICKED = 1
    REJECTED = 2
    UNSUBSCRIBED = 3
    TERMINATED = 4
    PENDING = 5
    INVITED = 6
    SUBSCRIBED = 7
    OWNER = 8
    
    def validate(self, status):
        if(status >= self.SUBSCRIBED):
            return True
        return False

# Contains a stripe subscription
class SquadMember(models.Model):
    #User who owns this subscription
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="squad_memberships")
    #User who owns this subscription
    squad = models.ForeignKey(Squad, on_delete=models.CASCADE, null=True, related_name="members")
    #The frequency of billing
    status = enum.EnumField(SquadMemberStatus, default=SquadMemberStatus.PENDING)
    #The stripe subscription id
    stripe_subscription_id = models.CharField(max_length=32, null=True, 
        blank=True)
    #Date that the user joined the subscription
    date_joined = models.DateTimeField(editable=False)
    #Date that the user left the subscription
    date_left = models.DateTimeField(null=True, blank=True, editable=True)
    
    def save(self, *args, **kwargs):
        ''' 
        On save, update timestamps 
        '''
        if not self.id:
            self.date_joined = timezone.now()
        return super(SquadMember, self).save(*args, **kwargs)
    
    
    def create_squad_owner_membership(self, squad, *args, **kwargs):
        """
        Creates a special membership for squad owners
        """
        self.status = SquadMemberStatus.OWNER
        self.user = squad.owner
        self.squad = squad
        self.date_joined = timezone.now()
        return super(SquadMember, self).save(*args, **kwargs)
        
        
    def create_basic_squad_membership(self, squad, user, *args, **kwargs):
        """
        Creates a membership for new squad members
        """
        cond1 = (self.status == SquadMemberStatus.SUBSCRIBED) and self.stripe_subscription_id != None
        
        cond2 = self.status == SquadMemberStatus.OWNER
        
        if cond1 or cond2:
            raise ValueError("An active membership for this squad already exists! Cancel membership before creating a new one or did you mean to update this membership?")
        if self.squad != None and self.squad != squad:
            raise ValueError("Cannot change squad. Create a new SquadMember instead.")
        self.status = SquadMemberStatus.SUBSCRIBED
        self.user = user
        self.squad = squad
        self.create_stripe_subscription(
            squad=squad,
            user=user
        )

        return super(SquadMember, self).save(*args, **kwargs)
        
        
    def create_invite_squad_membership(self, squad, user, *args, **kwargs):
        """
        Creates an invite for a prospective squad member
        """
        if(squad.is_active):
            self.status = SquadMemberStatus.INVITED
            self.user = user
            self.squad = squad
            self.date_joined = timezone.now()
            self.date_left = None
            return super(SquadMember, self).save(*args, **kwargs)
        raise ValueError("Cannot invite users to inactive squads!")
        
    def accept_invite(self, *args, **kwargs):
        if(self.status == SquadMemberStatus.INVITED):
            self.create_stripe_subscription(
                squad= self.squad,
                user= self.user
            )
            
            return super(SquadMember, self).save(*args, **kwargs)
        return super(SquadMember, self)
        
        
    def reject_invite(self, *args, **kwargs):
        if(self.status == SquadMemberStatus.INVITED):
            self.status = SquadMemberStatus.REJECTED
            return super(SquadMember, self).save(*args, **kwargs)
        return super(SquadMember, self)
        
        
    def create_stripe_subscription(self, squad, user):
        if(squad.is_active):
            self.date_joined = timezone.now()
            self.date_left = None
            stripe_subscription = stripe.Subscription.create(
                customer=user.stripe_customer.stripe_customer_id,
                items=[
                    {
                        "plan": squad.squad_service_id
                    }
                ]
            )
            self.status = SquadMemberStatus.SUBSCRIBED
            self.stripe_subscription_id = stripe_subscription.id
            self.squad.current_size += 1
            self.squad.save()
            return True
        raise ValueError("Cannot join an inactive squad!")
        
        
    def get_stripe_subscription(self):
        return stripe.Subscription.retrieve(
            self.stripe_subscription_id
        )
        
        
    def deactivate_membership(self, wasTerminated=False, *args, **kwargs):
        if(self.status == SquadMemberStatus.OWNER):
            raise ValueError("Cannot deactivate membership as squad owner! Deactivate squad instead.")
            
        if (self.status == SquadMemberStatus.SUBSCRIBED):
            subscription = self.get_stripe_subscription()
            subscription.delete()
            self.squad.current_size -= 1
            self.squad.save()
            self.stripe_subscription_id = None
            if(wasTerminated):
                self.status = SquadMemberStatus.TERMINATED
            else:
                self.status = SquadMemberStatus.UNSUBSCRIBED
        self.date_left = timezone.now()
        return super(SquadMember, self).save(*args, **kwargs)
        

#################################################
#############    MODEL SIGNALS   ################
#################################################

# Signals for Squad model.
@receiver(post_save, sender=Squad)
def create_squad(sender, instance=None, created=False, **kwargs):
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
                cost_price=instance.cost_price
            )
            instance.stripe_plan = stripe_plan
            instance.save()
        except:
           instance.delete()
           squadMember.delete()
           stripe_plan.delete()
           raise ValueError('Squad could not be created')

# Signals for Squad model to delete Stripe objects
@receiver(pre_delete, sender=StripePlan)
def delete_stripe_plan(sender, instance=None, **kwargs):
    try:
        instance.delete_plan()
    except:
        pass

# Signals for Squad model to delete Stripe objects
@receiver(post_delete, sender=Squad)
def delete_squad(sender, instance=None, **kwargs):
    try:
        instance.stripe_plan.delete()
    except:
        pass
    try:
        instance.deactivate()
    except:
        pass
        
# Signals for Squad model to delete Stripe objects
@receiver(pre_delete, sender=SquadMember)
def delete_member(sender, instance=None, **kwargs):
    try:
        instance.deactivate_membership()
    except:
        pass