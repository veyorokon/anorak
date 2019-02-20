import graphene 
from . types import *
from core.models import * 
from subscription.models import SubscriptionAccount, SubscriptionService
from graphql_jwt.decorators import login_required

class SubscriptionAccountMutation(graphene.Mutation):
    
    class Arguments:
        serviceKey = graphene.Int(required=True)
        token = graphene.String(required=True)
        username = graphene.String(required=True)
        password = graphene.String(required=True)
    
    subscriptionAccount =  graphene.Field(SubscriptionAccountType)
    
    @login_required
    def mutate(self, info, serviceKey, token, username, password, **kwargs):
        account = SubscriptionAccount.objects.get_or_create(
            responsible_user = info.context.user,
            service = SubscriptionService.objects.get(
                pk=serviceKey
            ),
        )[0]
        account.username = username
        account.password = password
        account.save()
        return SubscriptionAccountMutation(
            subscriptionAccount = account
        )

class Mutations(graphene.ObjectType):
    subscription_account = SubscriptionAccountMutation.Field(description = "Creates a new subscription account. The server will automatically create membership and a management request.")
    
