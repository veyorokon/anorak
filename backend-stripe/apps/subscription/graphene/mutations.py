"""
Graphene (GraphQL) mutations for the subscription models
"""

##########################################################################
## Imports
##########################################################################

import graphene 
from . types import _SubscriptionAccountType, _SubscriptionMemberType
from core.models import * 
from subscription.models import SubscriptionService, SubscriptionAccount, SubscriptionPlan, CreateAccount, SubscriptionMember, ConnectAccount
from subscription.enum import *
from graphql_jwt.decorators import login_required

class SubscriptionCreateMutation(graphene.Mutation):

    class Arguments:
        serviceKey = graphene.Int(required=True)
        planKey = graphene.Int(required=True)
        token = graphene.String(required=True)
        username = graphene.String(required=True)
        password = graphene.String(required=True)

    subscriptionAccount =  graphene.Field(_SubscriptionAccountType)

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
            status_account = SubscriptionAccountStatus.PENDING_CREATE,
            username = username,
            password = password
        )
                
        return SubscriptionCreateMutation(
            subscriptionAccount = account
        )


class SubscriptionConnectMutation(graphene.Mutation):

    class Arguments:
        serviceKey = graphene.Int(required=True)
        planKey = graphene.Int(required=True)
        token = graphene.String(required=True)
        username = graphene.String(required=True)
        password = graphene.String(required=True)

    subscriptionAccount =  graphene.Field(_SubscriptionAccountType)

    @login_required
    def mutate(self, info, serviceKey, planKey, token, username, password, **kwargs):
        user = info.context.user
        if not user.djstripe_customer.has_valid_source():
            raise ValueError(
                "Subscription could not be connected. No active card was on file."
            )
        service = SubscriptionService.objects.get(
            pk=serviceKey
        )    
        plan = SubscriptionPlan.objects.get(
            pk = planKey,
            service = service,
        )
        account = ConnectAccount.objects.create(
            type = SubscriptionAccountType.CONNECT,
            responsible_user = user,
            subscription_service = service,
            subscription_plan = plan,
            status_account = SubscriptionAccountStatus.PENDING_CONNECT,
            username = username,
            password = password
        )
        return SubscriptionConnectMutation(
            subscriptionAccount = account
        )


class ConfirmConnectAccountMutation(graphene.Mutation):

    class Arguments:
        token = graphene.String(required=True)
        subscriptionAccountKey = graphene.Int(required=True)

    subscriptionMember =  graphene.Field(_SubscriptionMemberType)

    @login_required
    def mutate(self, info, token, subscriptionAccountKey, **kwargs):
        user = info.context.user
        if not user.djstripe_customer.has_valid_source():
            raise ValueError(
                "Subscription could not be connected. No active card was on file."
            )
        # UPDATE STATUSES
        account = ConnectAccount.objects.get(
            pk = subscriptionAccountKey
        )
        account.status_account = SubscriptionAccountStatus.CONNECTED
        
        member = SubscriptionMember.objects.create(
            user = account.responsible_user,
            subscription_account = account,
            status_membership = MembershipStatus.ACTIVE
        )
        
        account.save()
        return ConfirmConnectAccountMutation(
            subscriptionMember = member
        )


class Mutations(graphene.ObjectType):
    subscription_create_account = SubscriptionCreateMutation.Field(
        description = "Creates a new subscription account. The server will automatically create membership and a management request."
    )
    
    subscription_connect_account = SubscriptionConnectMutation.Field(
        description = "Connect an existing subscription account. The service will automatically create a management request to verify connect login."
    )
    
    confirm_connect_account = ConfirmConnectAccountMutation.Field( 
        description = "Confirms a previously connected account. Membership is created and the user is billed."
    )
    
