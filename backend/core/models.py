from __future__ import unicode_literals
from random import randint
from django.db import models
from django.conf import settings
from .managers import UserManager
from django.dispatch import receiver
from django.core.mail import send_mail
from rest_framework.authtoken.models import Token
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import PermissionsMixin
from django.db.models.signals import post_save, pre_save
from django.contrib.auth.base_user import AbstractBaseUser
from verification_api.models import *
import stripe
stripe.api_key = settings.STRIPE_ACCOUNT_SID


# Stores the user's billing information
class AddressBilling(models.Model):
    name_on_card = models.CharField(max_length=70, null=True, blank=True)
    last_four = models.IntegerField(null=True, blank=True)
    street = models.CharField(max_length=64, null=True, blank=True)
    city = models.CharField(max_length=64, null=True, blank=True)
    state = models.CharField(max_length=64, null=True, blank=True)
    zip = models.IntegerField(null=True, blank=True)
    valid = models.BooleanField(default=False)
    

class StripeCustomer(models.Model):
    #The stripe customer id
    stripe_customer_id = models.CharField(max_length=32, null=True, 
        blank=True)
    #The stripe plan id
    stripe_credit_card_id = models.CharField(max_length=32, null=True,
        blank=True)
        
    def create_stripe_customer(self):
        data = stripe.Customer.create(email=self.user.email)
        self.stripe_customer_id = data.id
        self.save()
        return data
        
    def get_stripe_customer(self):
        customer = stripe.Customer.retrieve(self.stripe_customer_id)
        return customer


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    email_verification_code = models.OneToOneField(EmailVerificationCode, 
        null=True, on_delete=models.CASCADE, related_name='user')
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=30, blank=True)
    date_joined = models.DateTimeField(_('date joined'), 
        editable=True, auto_now_add=True)
    is_active = models.BooleanField(_('active'), default=True)
    is_staff = models.BooleanField(_('active'), default=False)
    stripe_customer = models.OneToOneField(StripeCustomer, null=True,
        on_delete=models.SET_NULL, related_name='user')
    session_token = models.OneToOneField(Token, null=True,
        on_delete=models.SET_NULL, related_name='session_user')
    address_billing = models.OneToOneField(AddressBilling, null=True, 
        blank=True, on_delete=models.SET_NULL, related_name='user')
    
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def get_full_name(self):
        '''
        Returns the first_name plus the last_name, with a space in between.
        '''
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        '''
        Returns the short name for the user.
        '''
        return self.first_name

    def email_user(self, subject, message, from_email=None, **kwargs):
        '''
        Sends an email to this User.
        '''
        send_mail(subject, message, from_email, [self.email], **kwargs)
        
    def validate_session_token(self, token):
        if(self.session_token.key == token):
            return True 
        return False

# Signals for Auth User model.
@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        session_token = Token.objects.create(user=instance)
        stripe_customer = StripeCustomer.objects.create(user=instance)
        stripe_customer.create_stripe_customer()
        address_billing = AddressBilling.objects.create(user=instance)
        instance.session_token = session_token
        instance.stripe_customer = stripe_customer
        instance.address_billing = address_billing
        instance.save()
        