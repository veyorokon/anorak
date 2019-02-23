from graphene_django.types import DjangoObjectType
from core.models import * 
from django.db.models import Q
from subscription.models import *

class SubscriptionType(DjangoObjectType):
    class Meta:
        model = SubscriptionService
        exclude_fields = []

class SubscriptionPricingPlanType(DjangoObjectType):
    class Meta:
        model = SubscriptionPricingPlan
        exclude_fields = []

class SubscriptionAccountType(DjangoObjectType):
    class Meta:
        model = SubscriptionAccount
        exclude_fields = ["username", "password"]

class SubscriptionMemberType(DjangoObjectType):
    class Meta:
        model = SubscriptionMember
        exclude_fields = []
