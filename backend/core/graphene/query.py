import graphene 
from graphene_django.types import DjangoObjectType
from graphql_jwt.decorators import login_required
from . types import *

class Query(graphene.ObjectType):
    all_users = graphene.List(UserType, token=graphene.String(required=True))
    user = graphene.Field(UserType, token=graphene.String(required=True))
    
    @login_required
    def resolve_user(self, info, token, **kwargs):
        return info.context.user
    