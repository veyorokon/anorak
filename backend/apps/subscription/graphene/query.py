import graphene 
from graphene_django.types import DjangoObjectType
from graphql_jwt.decorators import login_required
from . types import *
from subscription.models import *

class Query(graphene.ObjectType):
    subscription_services = graphene.List(SubscriptionType)
    subscription_memberships = graphene.List(SubscriptionMemberType, token=graphene.String(required=True))
    
    def resolve_subscription_services(self, info, **kwargs):
        return SubscriptionService.objects.all()
    
    @login_required
    def resolve_subscription_memberships(self, info, token,**kwargs):
        return SubscriptionMember.objects.filter(
            user = info.context.user
        )