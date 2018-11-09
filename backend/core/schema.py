import graphene 
from graphene_django.types import DjangoObjectType
from . models import * 
from graphql_jwt.decorators import login_required


class UserType(DjangoObjectType):
    class Meta:
        model = User
        
class StripeCustomerType(DjangoObjectType):
    class Meta:
        model = StripeCustomer

class Query(graphene.ObjectType):
    all_users = graphene.List(UserType, token=graphene.String(required=True))
    user = graphene.Field(UserType, id=graphene.Int())
    
    def resolve_user(self, info, id, **kwargs):
        return User.objects.get(pk=id)
    
    @login_required
    def resolve_all_users(self, info, token, **kwargs):
        return User.objects.all()
    