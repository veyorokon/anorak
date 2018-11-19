import graphene
import graphql_jwt
from core.graphene.query import Query as CoreQuery
from core.graphene.mutations import Mutations as CoreMutations 

from subscription_api.graphene.query import Query as SubscriptionQuery
from subscription_api.graphene.mutations import Mutations as SubscriptionMutations
 
class Mutations(CoreMutations, SubscriptionMutations, graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    revoke_token = graphql_jwt.Revoke.Field()

class Query(CoreQuery, SubscriptionQuery):
    pass

schema = graphene.Schema(query=Query, mutation=Mutations)
