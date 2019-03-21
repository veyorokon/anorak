from graphene_django.types import DjangoObjectType
from core.models import * 
from subscription.models import *
from request.models import *
from graphene_django.registry import Registry

class ManagementRequestType(DjangoObjectType):
    class Meta:
        model = ManagementRequest
        exclude_fields = []