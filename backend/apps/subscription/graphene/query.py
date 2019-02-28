import graphene 
from graphene_django.types import DjangoObjectType
from graphql_jwt.decorators import login_required
from . types import *
from subscription.models import *

class Query(graphene.ObjectType):
    subscription_services = graphene.List(SubscriptionType)
    account_credentials = graphene.Field(SubscriptionAccountLoginType, token = graphene.String(required=True), membershipKey = graphene.Int(required=True), description="Returns the squad secret if the user has an active membership.")
    
    def resolve_subscription_services(self, info, **kwargs):
        return SubscriptionService.objects.all()
        
    @login_required
    def resolve_account_credentials(self, info, token, membershipKey, **kwargs):
        user = info.context.user
        try:
            membership = SubscriptionMember.objects.get(pk=membershipKey, user=info.context.user)
        except:
            return None
        status = membership.status_membership
        statusVerification = MembershipStatus()
        if(statusVerification.validate(status)):
            return membership.subscription_account
        return None