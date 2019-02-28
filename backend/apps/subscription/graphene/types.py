from graphene_django.types import DjangoObjectType
from core.models import * 
from django.db.models import Q
from subscription.models import *
from graphene_django.registry import Registry

class SubscriptionType(DjangoObjectType):
    class Meta:
        model = SubscriptionService
        exclude_fields = ["subscription_accounts"]

class SubscriptionPricingPlanType(DjangoObjectType):
    class Meta:
        model = SubscriptionPricingPlan
        exclude_fields = ["subscription_accounts", "service"]

class SubscriptionAccountType(DjangoObjectType):
    class Meta:
        model = SubscriptionAccount
        exclude_fields = ["username", "password"]

class SubscriptionAccountLoginType(DjangoObjectType):
    class Meta:
        model = SubscriptionAccount
        only_fields = ["username", "password"]
        registry = Registry()

class SubscriptionMemberType(DjangoObjectType):
    class Meta:
        model = SubscriptionMember
        exclude_fields = []
