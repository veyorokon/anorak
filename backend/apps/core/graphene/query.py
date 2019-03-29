import graphene 
from graphene_django.types import DjangoObjectType
from graphql_jwt.decorators import login_required
from . types import _UserType

class Query(graphene.ObjectType):
    user = graphene.Field(_UserType, token=graphene.String(required=True))
    
    @login_required
    def resolve_user(self, info, token, **kwargs):
        return info.context.user
    