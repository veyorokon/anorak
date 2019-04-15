import graphene
from graphene_django.types import DjangoObjectType
from subscription.models import SubscriptionService, SubscriptionPlan, SubscriptionAccount, SubscriptionMember
from graphene_django.registry import Registry
from subscription.enum import SubscriptionAccountStatus

class _SubscriptionType(DjangoObjectType):
    class Meta:
        model = SubscriptionService
        exclude_fields = ["subscription_accounts"]

class _SubscriptionPlanType(DjangoObjectType):
    class Meta:
        model = SubscriptionPlan
        exclude_fields = ["subscription_accounts", "service"]

class _SubscriptionAccountType(DjangoObjectType):
    class Meta:
        model = SubscriptionAccount
        exclude_fields = ["username", "password"]

class _SubscriptionLoginType(DjangoObjectType):
    class Meta:
        model = SubscriptionAccount
        only_fields = ["username", "password", "id"]
        registry = Registry()

class _SubscriptionMemberType(DjangoObjectType):
    class Meta:
        model = SubscriptionMember
        exclude_fields = []
