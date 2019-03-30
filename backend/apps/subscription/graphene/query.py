import graphene
from graphene_django.types import DjangoObjectType
from graphql_jwt.decorators import login_required
from . types import _SubscriptionType, _SubscriptionLoginType
from subscription.models import *
from subscription.enum import MembershipStatus, SubscriptionAccountStatus

class Query(graphene.ObjectType):
    subscription_services = graphene.List(_SubscriptionType)

    subscription_account_status_map = graphene.types.json.JSONString(
        description='Subscription account map'
    )

    account_credentials = graphene.Field(
        _SubscriptionLoginType,
        token = graphene.String(required=True),
        membershipKey = graphene.Int(required=True),
        description="Returns the squad secret if the user has an active membership."
    )

    def resolve_subscription_services(self, info, **kwargs):
        return SubscriptionService.objects.all().filter(is_available=True)

    def resolve_subscription_account_status_map(self, info, **kwargs):
        jsonData = SubscriptionAccountStatus()
        return jsonData.enum_map()

    @login_required
    def resolve_account_credentials(self, info, token, membershipKey, **kwargs):
        user = info.context.user
        try:
            membership = SubscriptionMember.objects.get(pk=membershipKey, user=info.context.user)
        except:
            return None
        status = membership.status_membership
        statusVerification = MembershipStatus()
        cond1 = statusVerification.validate(status)
        cond2 = membership.subscription_account.responsible_user == user
        if(cond1 or cond2):
            return membership.subscription_account
        return None
