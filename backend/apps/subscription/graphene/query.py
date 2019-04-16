import graphene
from django.db.models import Q
from graphene_django.types import DjangoObjectType
from graphql_jwt.decorators import login_required
from . types import _SubscriptionType, _SubscriptionLoginType, _SubscriptionInviteType
from subscription.models import *
from subscription.enum import MembershipStatus, SubscriptionAccountStatus

class Query(graphene.ObjectType):
    subscription_services = graphene.List(_SubscriptionType)

    account_credentials = graphene.Field(
        _SubscriptionLoginType,
        token = graphene.String(required=True),
        subscriptionAccountKey = graphene.Int(required=True),
        description="Returns the squad secret if the user has an active membership."
    )

    subscription_invites_sent = graphene.List(
        _SubscriptionInviteType,
        token = graphene.String(required=True)
    )

    subscription_invites_received = graphene.List(
        _SubscriptionInviteType,
        token = graphene.String(required=True)
    )

    def resolve_subscription_services(self, info, **kwargs):
        return SubscriptionService.objects.all().filter(is_available=True)

    @login_required
    def resolve_subscription_invites_sent(self, info, token, **kwargs):
        user = info.context.user
        return SubscriptionInvite.objects.filter(
            sender=user
        )

    @login_required
    def resolve_subscription_invites_received(self, info, token, **kwargs):
        user = info.context.user
        return SubscriptionInvite.objects.filter(
            recipient_email=user.email
        )

    @login_required
    def resolve_account_credentials(self, info, token, subscriptionAccountKey, **kwargs):
        user = info.context.user
        try:
            account = SubscriptionAccount.objects.get(
                pk=subscriptionAccountKey
            )
        except:
            return None
        validated = account.validate_user(user)
        if(validated):
            return account
        return None
