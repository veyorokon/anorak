"""
Graphene (GraphQL) mutations for the subscription models
"""

##########################################################################
## Imports
##########################################################################

import graphene
from . types import _SubscriptionAccountType, _SubscriptionMemberType, _SubscriptionLoginType
from core.models import *
from subscription.models import SubscriptionService, SubscriptionAccount, SubscriptionPlan, CreateAccount, SubscriptionMember, ConnectAccount
from subscription.enum import *
from graphql_jwt.decorators import login_required


##########################################################################
## Mutation for new CreateAccount
##########################################################################

class SubscriptionAddMutation(graphene.Mutation):

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
            status_account = SubscriptionAccountStatus.ADDED,
            username = username,
            password = password
        )

        return SubscriptionAddMutation(
            subscriptionAccount = account
        )


##########################################################################
## Mutation for new ConnectAccount
##########################################################################

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
        if not user.is_member:
            raise ValueError(
                "Subscription could not be connected. No active membership."
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

##########################################################################
## Mutation to delete account
##########################################################################

class DeleteAccountMutation(graphene.Mutation):

    class Arguments:
        token = graphene.String(required=True)
        subscriptionAccountKey = graphene.Int(required=True)

    success =  graphene.Boolean()

    @login_required
    def mutate(self, info, token, subscriptionAccountKey, **kwargs):
        user = info.context.user
        try:
            account = SubscriptionAccount.objects.get(
                pk = subscriptionAccountKey,
                responsible_user = user
            )
        except:
            raise ValueError(
                "The subscription account could not be found."
            )
        account.delete()
        return DeleteAccountMutation(
            success = True
        )


##########################################################################
## Mutation to update account login
##########################################################################

class UpdateAccountMutation(graphene.Mutation):

    class Arguments:
        token = graphene.String(required=True)
        subscriptionAccountKey = graphene.Int(required=True)
        password = graphene.String(required=True)

    subscriptionAccount =  graphene.Field(_SubscriptionLoginType)

    @login_required
    def mutate(self, info, token, subscriptionAccountKey, password, **kwargs):
        user = info.context.user
        try:
            account = SubscriptionAccount.objects.get(
                pk = subscriptionAccountKey,
                responsible_user = user
            )
        except:
            raise ValueError(
                "The subscription account could not be found."
            )
        account.password = password
        account.save()
        return UpdateAccountMutation(
            subscriptionAccount = account
        )

class Mutations(graphene.ObjectType):
    subscription_add_account = SubscriptionAddMutation.Field(
        description = "Adds a new, unmanaged subscription account and no management request is generated."
    )

    subscription_connect_account = SubscriptionConnectMutation.Field(
        description = "Connect an existing subscription account. The service will automatically create a management request to verify connect login."
    )

    subscription_delete_account = DeleteAccountMutation.Field(
        description = "Delete a subscription account."
    )

    subscription_update_account = UpdateAccountMutation.Field(
        description = "Update subscription account."
    )
