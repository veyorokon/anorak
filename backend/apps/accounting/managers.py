# fugato.managers
# Custom managers for the accounting models

"""
Custom managers for the accounting models
"""

##########################################################################
## Imports
##########################################################################

from django.db import models
from backend.utility import get_first_day, get_last_day, today
##########################################################################
## Invoice Manager
##########################################################################

class InvoiceManager(models.Manager):
    
    def get_or_create_this_month(self, user, **kwargs):
        """
        Return the Invoice of for this month or will create one.
        """
        lastDay = get_last_day(today())
        query = self.filter(
            date_for = lastDay,
            user = user
        )
        if query.exists():
            return query.first()
        return self.create(user=user,**kwargs)