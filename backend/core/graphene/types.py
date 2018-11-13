from graphene_django.types import DjangoObjectType
from core.models import * 

class BillingAddressType(DjangoObjectType):
    class Meta:
        model = BillingAddress

class ShippingAddressType(DjangoObjectType):
    class Meta:
        model = ShippingAddress

class UserType(DjangoObjectType):
    class Meta:
        model = User
        