import graphene 
from graphene_django.types import DjangoObjectType
from . models import * 

class UserType(DjangoObjectType):
    class Meta:
        model = User
        
class StripeCustomerType(DjangoObjectType):
    class Meta:
        model = StripeCustomer

class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)
    all_stripe_customers = graphene.List(StripeCustomerType)
    user = graphene.Field(UserType, id=graphene.Int())
    
    def resolve_user(self, info, id, **kwargs):
        return User.objects.get(pk=id)
    
    def resolve_all_users(self, info, **kwargs):
        return User.objects.all()
        
    def resolve_all_stripe_customers(self, info, **kwargs):
        return StripeCustomer.objects.all()
        
    