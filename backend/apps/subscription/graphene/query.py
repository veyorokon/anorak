import graphene 
from graphene_django.types import DjangoObjectType
from graphql_jwt.decorators import login_required
from . types import *
from subscription.models import *

class Query(graphene.ObjectType):
    subscription_services = graphene.List(SubscriptionType)
    
    def resolve_subscription_services(self, info, **kwargs):
        return SubscriptionService.objects.all()
