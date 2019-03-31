import graphene
from graphene_django.types import DjangoObjectType
from graphql_jwt.decorators import login_required
from . types import _SubscriptionType, _SubscriptionLoginType, SubscriptionAccountStatusEnum
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
        subscriptionAccountKey = graphene.Int(required=True),
        description="Returns the squad secret if the user has an active membership."
    )

    account_status = graphene.Field(SubscriptionAccountStatusEnum)

    def resolve_subscription_services(self, info, **kwargs):
        return SubscriptionService.objects.all().filter(is_available=True)

    def resolve_subscription_account_status_map(self, info, **kwargs):
        jsonData = SubscriptionAccountStatus()
        return jsonData.enum_map()

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

    def resolve_account_status(self, info, **kwargs):
        print(SubscriptionAccountStatus.__enumerable__())
        return SubscriptionAccountStatus.__enumerable__().ACTIVE

# def resolve_account_status(self, info, **kwargs):
#     orderedDict = SubscriptionAccountStatus.__enumerable__().__members__.items()
#     return type('Enum', (), dict(orderedDict))
