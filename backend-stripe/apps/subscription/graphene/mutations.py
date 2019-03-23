import graphene 
from . types import _SubscriptionAccountType, _SubscriptionMemberType
from core.models import * 
from subscription.models import SubscriptionService, SubscriptionAccount, SubscriptionPlan, CreateAccount, SubscriptionMember
from subscription.enum import *
from graphql_jwt.decorators import login_required

class SubscriptionCreateMutation(graphene.Mutation):

    class Arguments:
        serviceKey = graphene.Int(required=True)
        planKey = graphene.Int(required=True)
        token = graphene.String(required=True)
        username = graphene.String(required=True)
        password = graphene.String(required=True)

    subscriptionMember =  graphene.Field(_SubscriptionMemberType)

    @login_required
    def mutate(self, info, serviceKey, planKey, token, username, password, **kwargs):
        user = info.context.user
        if not user.djstripe_customer.has_valid_source():
            raise ValueError(
                "Subscription could not be created. No active card was on file."
            )
        service = SubscriptionService.objects.get(
            pk=serviceKey
        )    
        plan = SubscriptionPlan.objects.get(
            pk = planKey,
            service = service,
        )
        account = CreateAccount.objects.create(
            responsible_user = user,
            subscription_service = service,
            subscription_plan = plan,
            status_account = SubscriptionAccountStatus.PENDING,
            username = username,
            password = password
        )
        
        member = SubscriptionMember.objects.create(
            user = account.responsible_user,
            subscription_account = account,
        )
        return SubscriptionCreateMutation(
            subscriptionMember = member
        )


class Mutations(graphene.ObjectType):
    subscription_member = SubscriptionCreateMutation.Field(
        description = "Creates a new subscription account. The server will automatically create membership and a management request."
    )
    
    # confirm_connected_account = SubscriptionAccountConnectConfirmMutation.Field(description = "Confirms a previously connected account.")
    
