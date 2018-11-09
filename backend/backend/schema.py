import graphene
from core.schema import Query as CoreQuery
import graphql_jwt

class Mutations(graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()

class Query(CoreQuery):
    pass
    
schema = graphene.Schema(query=CoreQuery, mutation=Mutations)