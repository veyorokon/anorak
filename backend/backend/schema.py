import graphene
import graphql_jwt
from core.graphene.query import Query as CoreQuery
from core.graphene.mutations import Mutations as CoreMutations 
from subscription.graphene.mutations import Mutations as SubscriptionMutations
from subscription.graphene.query import Query as SubscriptionQuery
from request.graphene.mutations import Mutations as RequestMutation

class Mutations(CoreMutations, SubscriptionMutations, RequestMutation):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    revoke_token = graphql_jwt.Revoke.Field()

class Query(CoreQuery, SubscriptionQuery):
    pass

schema = graphene.Schema(query=Query, mutation=Mutations)
