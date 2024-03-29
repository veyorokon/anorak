from __future__ import unicode_literals
import random
import string
from django.db import models
from django.conf import settings
from .managers import UserManager
from backend.stripe import stripe
from backend.utility import get_current_epoch
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
    date_joined = models.DateTimeField(_('date joined'), editable=True, null=True, auto_now_add=True)
    is_active = models.BooleanField(_('active'), default=True)
    is_staff = models.BooleanField(_('staff'), default=False)
    is_member = models.BooleanField(_('is paying member'), default=False)
    is_verified = models.BooleanField(_('is verified'), default=False)
    #The stripe connect account
    stripe_account = models.CharField(max_length=128, null=True, blank=True)

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

    @property
    def dashboard_accounts(self):
        accounts = self.subscription_accounts.all()
        ownedAccounts = []
        for account in accounts:
            if account.responsible_user == self:
                ownedAccounts.append(account)
        return list(set(ownedAccounts))


##########################################################################
## Verification Email Codes
##########################################################################

class EmailVerification(models.Model):
    #serice this pricing plan is attached to
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="verification_emails")
    #The verification code
    code = models.CharField(max_length=128, null=True, blank=True)
    #Epoch date that the code was created
    date_created = models.IntegerField(editable=False)
    #Epoch date that the code expires
    date_expires = models.IntegerField(editable=False)

    def save(self, *args, **kwargs):
        '''
        On save, update timestamps
        '''
        if not self.id:
            currentEpoch = get_current_epoch()
            self.date_created = currentEpoch
            self.date_expires = currentEpoch+ 2*86400
            self.code = ''.join(random.choice(string.ascii_lowercase + string.ascii_uppercase + string.digits) for _ in range(120))
        return super(EmailVerification, self).save(*args, **kwargs)

    class Meta:
        ordering = ['-date_expires']
