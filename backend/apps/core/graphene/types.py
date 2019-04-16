import graphene
from graphene_django.types import DjangoObjectType
from core.models import *

from subscription.graphene.types import _SubscriptionAccountType

class _UserType(DjangoObjectType):
    dashboardAccounts = graphene.List(
        _SubscriptionAccountType,
        source='dashboard_accounts'
    )

    class Meta:
        model = User
        exclude_fields = ['is_superuser', 'is_staff', 'password', 'facebook_id']

    def resolver(self, info):
        user = info.context.user
        if user == self or user.is_staff:
            return user.__dict__[info.field_name]
        return None
