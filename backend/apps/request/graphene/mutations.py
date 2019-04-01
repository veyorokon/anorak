"""
Graphene (GraphQL) mutations for the request models
"""

##########################################################################
## Imports
##########################################################################

import graphene
from core.models import User
from django.utils import timezone
from subscription.models import SubscriptionMember
from . types import _ManagementRequestType
from request.models import ManagementRequest
from request.enum import *
from graphql_jwt.decorators import login_required
from subscription.enum import SubscriptionAccountStatus

##########################################################################
## Mutation to cancel membership
##########################################################################

class CancelSubscriptionMemberMutation(graphene.Mutation):

    class Arguments:
        token = graphene.String(required=True)
        subscriptionAccountKey = graphene.Int(required=True)

    managementRequest =  graphene.Field(_ManagementRequestType)

    @login_required
    def mutate(self, info, token, subscriptionAccountKey, **kwargs):
        user = info.context.user

        try:
            member = SubscriptionMember.objects.get(
                user = user,
                subscription_account__id = subscriptionAccountKey
            )
        except:
            raise ValueError(
                "No membership to this subscription account was found."
            )
        account = member.subscription_account
        if member.user == member.subscription_account.responsible_user:
            account.status_account = SubscriptionAccountStatus.PENDING_CANCELLATION
            account.save()
            managementRequest = ManagementRequest.objects.create(
                subscription_account = account,
                requested_by = user,
                requested_action = ManagementRequestAction.CANCEL_ACCOUNT
            )
        else:
            member.delete()
            managementRequest = ManagementRequest.objects.create(
                subscription_account = account,
                requested_by = user,
                requested_action = ManagementRequestAction.CANCEL_MEMBER,
                status = ManagementRequestStatus.COMPLETED_BY_SERVER,
                processed_notes = "Automatic complete on server.",
                date_processed = timezone.now()
            )

        return CancelSubscriptionMemberMutation(
            managementRequest = managementRequest
        )


class Mutations(graphene.ObjectType):
    cancel_member_request = CancelSubscriptionMemberMutation.Field(
        description = "Cancels the membership, and the appropriate management request depending on the member's status."
    )
