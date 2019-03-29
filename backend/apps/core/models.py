from __future__ import unicode_literals

from django.db import models
from django.conf import settings
from .managers import UserManager
from backend.stripe import stripe
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import PermissionsMixin
from django.db.models.signals import post_save, pre_delete, post_delete
from django.contrib.auth.base_user import AbstractBaseUser

from rest_framework_jwt.settings import api_settings
jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

from django.utils import timezone



class User(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(_('email address'), blank=False, unique=True,
        null=True)
    phone_number = models.CharField( max_length=17, blank=True, unique=True, 
        null=True)
    facebook_id = models.CharField(_('facebook id'), max_length=30, blank=True, null=True, editable=False)
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=30, null=True, blank=True)
    date_joined = models.DateTimeField(_('date joined'), 
        editable=True, null=True, auto_now_add=True)
    is_active = models.BooleanField(_('active'), default=True)
    is_staff = models.BooleanField(_('staff'), default=False)
    
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
        
    @property
    def djstripe_customer(self):
        return self.djstripe_customers.first()
    
    @property
    def djstripe_subscription(self):
        return self.djstripe_customer.subscription
    
    def upcoming_invoice(self):        
        invoice = stripe.Invoice.upcoming(
            customer=self.djstripe_customer.id
        )
        return invoice
    
    def latest_invoice(self):
        subscription = stripe.Subscription.retrieve(
            id=self.djstripe_subscription.id
        )        
        invoice = stripe.Invoice.retrieve(
            id=subscription.latest_invoice
        )
        return invoice
        
    def get_shipping_zip(self):
        customer = stripe.Customer.retrieve(self.djstripe_customer.id)
        return customer.shipping.address.postal_code
