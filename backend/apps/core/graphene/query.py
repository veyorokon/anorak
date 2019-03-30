import graphene
from graphene_django.types import DjangoObjectType
from graphql_jwt.decorators import login_required
from djstripe.models import Customer
from . types import _UserType

class Query(graphene.ObjectType):
    user = graphene.Field(_UserType, token=graphene.String(required=True))
    customer = graphene.types.json.JSONString(
        token=graphene.String(required=True),
        description='JSON result test'
    )

    @login_required
    def resolve_user(self, info, token, **kwargs):
        return info.context.user

    @login_required
    def resolve_customer(self, info, token, **kwargs):
        user = info.context.user
        return user.customer_api
