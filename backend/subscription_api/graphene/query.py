import graphene 
from . types import * 
from subscription_api.models import Squad
from django.contrib.postgres.search import SearchVector


class Query(graphene.ObjectType):
    squad_search = graphene.List(RestrictedSquadType, text=graphene.String(required=True))
    
    
    def resolve_squad_search(self, info, text, **kwargs):
        return Squad.objects.filter(description__icontains=text)
        