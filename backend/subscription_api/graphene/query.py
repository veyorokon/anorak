import graphene 
from . types import * 
from itertools import chain
from django.db.models import Q
from subscription_api.models import *
from graphql_jwt.decorators import login_required
from django.db.models import F



class Query(graphene.ObjectType):
    squad_search = graphene.List(SquadType, token=graphene.String(required=False), text=graphene.String(required=True), description="Search active and public squads for key words in the service or description. Returns all squads with available space.")
    
    get_secret = graphene.Field(graphene.String, token=graphene.String(required=True), membershipID=graphene.Int(required=True), description="Returns the squad secret if the user has an active membership.")
    
    squad = graphene.Field(SquadType,token=graphene.String(required=False), squadID=graphene.Int(required=True), description="Return the squad if the user owns it.")
    
    squad_memberships = graphene.List(SquadMemberType, token=graphene.String(required=True), description="Returns a list of all: invites, subscriptions and owned squads.")
    
    
    def resolve_squad_search(self, info, text, **kwargs):
        user = info.context.user
        excludeSquads = set()
        searchMemberships = Squad.objects.filter(Q(service__icontains=text) | Q(description__icontains=text)).filter(is_public=True).filter(is_active=True).filter(Q(maximum_size=None) | Q(current_size__lt = F('maximum_size')))        
        if not user.is_anonymous:
            squadsWithUserBan = Squad.objects.filter(members__user=user, members__status = SquadMemberStatus.BANNED)
            excludeSquads = list(squadsWithUserBan)
        searchResults = set(searchMemberships).difference(set(excludeSquads))
        return searchResults
        
    @login_required
    def resolve_get_secret(self, info, token, membershipID, **kwargs):
        user = info.context.user
        membership = user.squad_memberships.filter(id=membershipID)
        statusVerification = SquadMemberStatus()
        if(membership and statusVerification.validate(membership[0].status)):
            if(membership[0].squad.is_active):
                return membership[0].squad.secret
            else:
                return "Squad has been deactivated by the owner and all subscriptions have been terminated."
        return None
        
    def resolve_squad(self, info, squadID, token=None):
        squad = Squad.objects.get(
            id = squadID
        )
        return squad
        
    @login_required
    def resolve_squad_memberships(self, info, token):
        user = info.context.user
        memberships = SquadMember.objects.filter(
            status__gte=SquadMemberStatus.INVITED,
            user = user,
        )
        return memberships