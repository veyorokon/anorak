import graphene 
from graphene_django.types import DjangoObjectType
from . models import * 
from graphql_jwt.decorators import login_required, staff_member_required


class UserType(DjangoObjectType):
    class Meta:
        model = User
        
class StripeCustomerType(DjangoObjectType):
    class Meta:
        model = StripeCustomer

class Query(graphene.ObjectType):
    all_users = graphene.List(UserType, token=graphene.String(required=True))
    user = graphene.Field(UserType, token=graphene.String(required=True))
    all_stripe_customers = graphene.List(StripeCustomerType)
    
    @login_required
    def resolve_user(self, info, token, **kwargs):
        return info.context.user
    
    @staff_member_required
    def resolve_all_users(self, info, token, **kwargs):
        return User.objects.all()
        

"""
query allUsers($token: String!) {
  allUsers(token: $token) {
    id
    email
  }
}


query user($token: String!) {
  user(token: $token) {
    id
    email
    firstName
    lastName
  }
}
"""