"""
Custom managers for the subscription models
"""

##########################################################################
## Imports
##########################################################################

from django.db import models
from . enum import * 

##########################################################################
## Subscription Account Managers
##########################################################################

class ConnectAccountManager(models.Manager):
    def get_queryset(self):
        return super(ConnectAccountManager, self).get_queryset().filter(
            type=SubscriptionAccountType.CONNECT)
            
    def create(self, **kwargs):
        kwargs.update({
            'is_connected_account': True, 
            'type': SubscriptionAccountType.CONNECT
        })
        return super(ConnectAccountManager, self).create(**kwargs)

class CreateAccountManager(models.Manager):
    def get_queryset(self):
        return super(CreateAccountManager, self).get_queryset().filter(
            type=SubscriptionAccountType.CREATE)
