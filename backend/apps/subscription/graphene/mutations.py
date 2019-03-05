import graphene 
from . types import *
from core.models import * 
from subscription.models import SubscriptionAccount, SubscriptionService, SubscriptionPricingPlan
from graphql_jwt.decorators import login_required

class SubscriptionAccountMutation(graphene.Mutation):
    
    class Arguments:
        serviceKey = graphene.Int(required=True)
        planKey = graphene.Int(required=True)
        token = graphene.String(required=True)
        username = graphene.String(required=True)
        password = graphene.String(required=True)
    
    subscriptionAccount =  graphene.Field(SubscriptionAccountType)
    
    @login_required
    def mutate(self, info, serviceKey, planKey, token, username, password, **kwargs):
        if not info.context.user.stripe_customer.has_card_on_file:
            raise ValueError("Subscription could not be created. No active card was on file.")
        service = SubscriptionService.objects.get(
            pk=serviceKey
        )
        account = SubscriptionAccount.objects.get_or_create(
            responsible_user = info.context.user,
            service = service,
            price_plan = SubscriptionPricingPlan.objects.get(
                pk = planKey,
                service = service
            )
        )[0]
        account.username = info.context.user.email
        account.password = password
        account.save()
        return SubscriptionAccountMutation(
            subscriptionAccount = account
        )

class Mutations(graphene.ObjectType):
    subscription_account = SubscriptionAccountMutation.Field(description = "Creates a new subscription account. The server will automatically create membership and a management request.")
    
