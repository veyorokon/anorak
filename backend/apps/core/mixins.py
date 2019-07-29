"""
Custom mixin for the core models
"""

##########################################################################
## Imports
##########################################################################

from django.db import models
from backend.utility import get_current_epoch
from django.conf import settings
from .managers import BaseManager

class BaseMixin(models.Model):
    #Date that the model instance was created
    date_created = models.IntegerField(editable=False, default=get_current_epoch())
    #Date that the model instance was modified
    date_modified = models.IntegerField(editable=False, default=get_current_epoch())
    #If this model instance is live data or not
    live_mode = models.BooleanField(editable=False, default=False)
    #If this instance is available
    trashed = models.BooleanField(editable=False, default=False)

    objects = BaseManager()

    def save(self, *args, **kwargs):
        '''
        On save, update timestamps
        '''
        if not self.id:
            self.live_mode = not settings.DEBUG
        self.date_modified = get_current_epoch()
        return super(BaseMixin, self).save(*args, **kwargs)

    class Meta:
        abstract = True
