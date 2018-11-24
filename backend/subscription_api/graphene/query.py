import graphene 
from . types import * 
from django.db.models import Q
from subscription_api.models import *
from graphql_jwt.decorators import login_required



class Query(graphene.ObjectType):
    squad_search = graphene.List(RestrictedSquadType, text=graphene.String(required=True))
    
    get_secret = graphene.Field(graphene.String, token=graphene.String(required=True), membershipID=graphene.Int(required=True))
    
    
    def resolve_squad_search(self, info, text, **kwargs):
        return Squad.objects.filter(Q(service__icontains=text) | Q(description__icontains=text)).filter(is_public=True).filter(is_active=True)
        
    @login_required
    def resolve_get_secret(self, info, token, membershipID, **kwargs):
        user = info.context.user
        membership = user.squad_memberships.filter(id=membershipID)
        statusVerification = SquadMemberStatus()
        if(membership and statusVerification.validate(membership[0].status)):
            return membership[0].squad.secret
        return None
        