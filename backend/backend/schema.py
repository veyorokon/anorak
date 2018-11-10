import graphene
from core.schema import Query as CoreQuery
from core.schema import Mutations as CoreMutations
import graphql_jwt

class Mutations(CoreMutations, graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()

class Query(CoreQuery):
    pass
    
schema = graphene.Schema(query=CoreQuery, mutation=Mutations)