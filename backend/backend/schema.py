import graphene
from core.schema import Query as CoreQuery
from core.schema import Mutations as CoreMutations

from subscription_api.schema import Mutations as SubscriptionMutations
import graphql_jwt

class Mutations(CoreMutations, SubscriptionMutations, graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()

class Query(CoreQuery, SubscriptionQuery):
    pass
    
schema = graphene.Schema(query=Query, mutation=Mutations)