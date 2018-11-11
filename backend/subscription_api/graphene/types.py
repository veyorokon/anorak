from graphene_django.types import DjangoObjectType
from subscription_api.models import * 

class SquadType(DjangoObjectType):
    class Meta:
        model = Squad

class SquadMemberType(DjangoObjectType):
    class Meta:
        model = SquadMember