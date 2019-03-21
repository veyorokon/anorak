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

import taxjar
import stripe
stripe.api_key = settings.STRIPE_ACCOUNT_SID

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
    
# 
# class StripeCustomer(models.Model):
#     #The user for this customer 
#     user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="stripe_customer")
#     #The stripe customer id
#     stripe_customer_id = models.CharField(max_length=32, null=True, blank=True)
#     #The stripe customer's subscription to Anorak
#     stripe_subscription_id = models.CharField(max_length=32, null=True, blank=True)
#     #The stripe plan id
#     stripe_credit_card_id = models.CharField(max_length=32, null=True, blank=True)
#     #Date that the service was created
#     date_created = models.DateTimeField(editable=False)
#     #Date that the service was modified
#     date_modified = models.DateTimeField(editable=False)
#     #If the user has at least one card on file
#     has_card_on_file = models.BooleanField(default=False)
#     name = models.CharField(max_length=64, null=True, blank=True)
#     line_1 = models.CharField(max_length=32, null=True, blank=True)
#     line_2 = models.CharField(max_length=32, null=True, blank=True)
#     city = models.CharField(max_length=32, null=True, blank=True)
#     state = models.CharField(max_length=32, null=True, blank=True)
#     country = models.CharField(max_length=32, null=True, blank=True)
#     zip = models.IntegerField(null=True, blank=True)
#     last_four = models.IntegerField(null=True, blank=True)
#     tax_rate = models.FloatField(null=True, blank=True)
# 
#     def get_user_sales_tax_rate(self):
#         taxClient = taxjar.Client(api_key=settings.TAX_JAR_KEY)
#         stateSalesTax = 0
#         if self.zip:
#             rates = taxClient.rates_for_location(str(self.zip))
#             stateSalesTax = rates.state_rate
#         self.tax_rate = stateSalesTax
#         return stateSalesTax
# 
#     def create_stripe_customer(self):
#         data = stripe.Customer.create(
#             description="Customer for "+str(self.user.email),
#             email=self.user.email
#         )
#         self.stripe_customer_id = data.id
# 
# 
#     def get_stripe_customer(self):
#         customer = stripe.Customer.retrieve(self.stripe_customer_id)
#         return customer
# 
#     def get_stripe_subscription(self):
#         subscription = stripe.Subscription.retrieve(
#             id=self.stripe_subscription_id
#         )
#         return subscription
# 
#     def get_stripe_latest_invoice(self):
#         subscription = self.get_stripe_subscription()
#         invoice = stripe.Invoice.retrieve(
#             id=subscription.latest_invoice
#         )
#         return invoice
# 
#     def get_stripe_upcoming_invoice(self):
#         invoice = stripe.Invoice.upcoming(customer=self.stripe_customer_id)
#         return invoice
# 
#     def delete_customer(self):
#         """
#         Deletes the customer object in Stripe's database
#         """
#         customer =self.get_stripe_customer()
#         customer.delete()
# 
# 
#     def link_card(self, token):
#         customer = self.get_stripe_customer()
#         try:
#             lastCard = customer.sources.list(limit=3, object='card')['data'][0].id
#             customer.sources.retrieve(lastCard).delete()
#         except:
#             pass
#         source = customer.sources.create(
#             source=token
#         )
#         self.has_card_on_file = True
#         self.line_1 = source.address_line1
#         self.line_2 = source.address_line2
#         self.city = source.address_city
#         self.state = source.address_state
#         self.country = source.country
#         self.zip = source.address_zip
#         self.name = source.name
#         self.last_four = source.last4
#         self.save()
# 
#     def save(self, *args, **kwargs):
#         ''' 
#         On save, update timestamps 
#         '''
#         if not self.id:
#             self.date_created = timezone.now()
#             self.create_stripe_customer()
#         self.get_user_sales_tax_rate()
#         self.date_modified = timezone.now()
#         return super(StripeCustomer, self).save(*args, **kwargs)
# 
