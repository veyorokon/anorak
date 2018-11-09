import graphene
from core.schema import Query as CoreQuery

class Query(CoreQuery):
    pass
    
schema = graphene.Schema(query=CoreQuery)