from django.db import models
from core.models import User
from django.utils import timezone


# Create your models here.
class Trigger(models.Model):
    #User who triggered the event
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    event = models.CharField(max_length=64)
    page = models.CharField(max_length=32, null=True, blank=True)
    module = models.CharField(max_length=32, null=True, blank=True)
    time = models.DateTimeField(editable=False)
    #Date that the event was modified
    date_modified = models.DateTimeField(editable=False, null=True)
    
    
    def save(self, *args, **kwargs):
        ''' 
        On save, update timestamps 
        '''
        if not self.id:
            self.time = timezone.now()
        self.date_modified = timezone.now()
        return super(Trigger, self).save(*args, **kwargs)