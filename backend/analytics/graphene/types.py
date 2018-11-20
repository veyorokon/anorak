from graphene_django.types import DjangoObjectType
from analytics.models import * 

class TriggerType(DjangoObjectType):
    class Meta:
        model = Trigger
