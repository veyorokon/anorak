from __future__ import unicode_literals

from django.db import models
from django.conf import settings
from .managers import UserManager
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import PermissionsMixin
from django.db.models.signals import post_save, pre_delete, post_delete
from django.contrib.auth.base_user import AbstractBaseUser

import stripe
stripe.api_key = settings.STRIPE_ACCOUNT_SID

from rest_framework_jwt.settings import api_settings
jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER


class Address(models.Model):
    line_1 = models.CharField(max_length=32, null=True, blank=True)
    line_2 = models.CharField(max_length=32, null=True, blank=True)
    city = models.CharField(max_length=32, null=True, blank=True)
    state = models.CharField(max_length=32, null=True, blank=True)
    zip = models.IntegerField(null=True, blank=True)
    
    def __str__(self):
        output = "{} {}. {}, {} {}".format(
            self.line_1, self.line_2, self.city, self.state, self.zip
        )
        return output.upper()
        
    class Meta:
        managed = False
        
class ShippingAddress(Address):
    class Meta:
        managed = True
        
class BillingAddress(Address):
    class Meta:
        managed =True


class StripeCustomer(models.Model):
    #The stripe customer id
    stripe_customer_id = models.CharField(max_length=32, null=True, blank=True)
    #The stripe plan id
    stripe_credit_card_id = models.CharField(max_length=32, null=True, blank=True)
        
    def create_stripe_customer(self):
        data = stripe.Customer.create(
            description="Customer for "+str(self.user.email)
        )
        self.stripe_customer_id = data.id

        
    def get_stripe_customer(self):
        customer = stripe.Customer.retrieve(self.stripe_customer_id)
        return customer
        
    def delete_customer(self):
        """
        Deletes the customer object in Stripe's database
        """
        customer =self.get_stripe_customer()
        customer.delete()
        
    def link_card(self, token):
        customer = self.get_stripe_customer()
        customer.sources.create(
            source=token
        )


class User(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(_('email address'), blank=False, unique=True,
        null=True)
    phone_number = models.CharField( max_length=17, blank=True, unique=True, 
        null=True)
    facebook_id = models.CharField(_('facebook id'), max_length=30, blank=True, editable=False)
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=30, null=True, blank=True)
    address_billing = models.OneToOneField(BillingAddress, null=True, on_delete=models.SET_NULL, related_name='user')
    address_shipping = models.OneToOneField(ShippingAddress, null=True, on_delete=models.SET_NULL, related_name='user')
    date_joined = models.DateTimeField(_('date joined'), 
        editable=True, auto_now_add=True)
    is_active = models.BooleanField(_('active'), default=True)
    is_staff = models.BooleanField(_('staff'), default=False)
    stripe_customer = models.OneToOneField(StripeCustomer, null=True,
        on_delete=models.SET_NULL, related_name='user')
    payment_method =models.CharField(max_length=32, blank=True, null=True)
    
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FILEDS = []

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')
 
    def __str__(self):
        return 'Email={0}'.format(
            self.email
        )
    
    @property
    def json_web_token(self):
        payload = jwt_payload_handler(self)
        token = jwt_encode_handler(payload)
        return token
    


####################################################################
########                      SIGNALS                       ########
####################################################################

# Signals for Auth User model.
@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
        stripe_customer = StripeCustomer.objects.create(user=instance)
        stripe_customer.create_stripe_customer()
        stripe_customer.save()
        instance.stripe_customer = stripe_customer
        instance.save()
        
# Signals for Squad model to delete Stripe objects
def delete_reverse(sender, **kwargs):
    try:
        if kwargs['instance'].stripe_customer:
            kwargs['instance'].stripe_customer.delete()
    except:
        pass
        
@receiver(pre_delete, sender=StripeCustomer)
def delete_stripe_customer(sender, instance=None, **kwargs):
    try:
        instance.delete_customer()
    except:
        pass
    
post_delete.connect(delete_reverse, sender=User)
