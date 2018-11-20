from graphene_django.types import DjangoObjectType
from subscription_api.models import * 

class RestrictedSquadType(DjangoObjectType):
    class Meta:
        model = Squad
        exclude_fields = ['username', 'password', 'owner', 'secret', 'date_created', 'date_modified', 'stripe_plan']


class SquadMemberType(DjangoObjectType):
    class Meta:
        model = SquadMember