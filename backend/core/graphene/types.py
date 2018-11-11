from graphene_django.types import DjangoObjectType
from core.models import * 

class UserType(DjangoObjectType):
    class Meta:
        model = User
        