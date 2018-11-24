from graphene_django.types import DjangoObjectType
from core.models import * 

class StripeCustomerType(DjangoObjectType):
    class Meta:
        model = StripeCustomer
        exclude_fields = ['stripe_customer_id', 'stripe_credit_card_id']

class ShippingAddressType(DjangoObjectType):
    class Meta:
        model = ShippingAddress

class UserType(DjangoObjectType):
    class Meta:
        model = User
        