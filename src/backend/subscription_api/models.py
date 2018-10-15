from django.db import models
from django_enumfield import enum
from django.conf import settings
from django.utils import timezone

class Squad(models.Model):
    #User who owns this subscription
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    #Squad description
    description = models.CharField(max_length=32, null=True)
    #Date that the subscription was created
    date_created = models.DateTimeField(editable=False)
    #Date that the subscription was created
    date_modified = models.DateTimeField(editable=False)
    #Date that the start date for the subscription
    date_subscription_start = models.DateTimeField(blank=True,null=True,editable=True)
    
    def save(self, *args, **kwargs):
        ''' 
        On save, update timestamps 
        '''
        if not self.id:
            self.date_created = timezone.now()
        self.date_modified = timezone.now()
        return super(Squad, self).save(*args, **kwargs)
        

class SquadMember(models.Model):
    #User who owns this subscription
    squad = models.ForeignKey(Squad, on_delete=models.CASCADE)
    #Squad description
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    #Date that the user joined the subscription
    date_joined = models.DateTimeField(editable=False)
    #Date that the user left the subscription
    date_left = models.DateTimeField(null=True, blank=True, editable=True)
    
    def save(self, *args, **kwargs):
        ''' 
        Keep track of date the user joined this squad
        '''
        if not self.id:
            self.date_joined = timezone.now()
        return super(SquadMember, self).save(*args, **kwargs)
