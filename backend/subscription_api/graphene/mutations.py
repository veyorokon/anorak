import graphene 
from . types import *
from graphql_jwt.decorators import login_required

import re 

def convert(name):
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()
    
def set_members_to_pending(squad):
    squadMembers = SquadMember.objects.filter(squad=squad).filter(status=SquadMemberStatus.SUBSCRIBED)
    for member in squadMembers:
        member.status=SquadMemberStatus.PENDING
        try:
            member.deactivate_membership()
        except:
            pass
        member.save()


class CreateSquad(graphene.Mutation):
    
    class Arguments:
        service = graphene.String(required=True)
        description = graphene.String(required=True)
        secret = graphene.String()
        costPrice = graphene.Float(required=True)
        maxSize = graphene.Int(required=True)
        token = graphene.String(required=True)
        isPublic = graphene.Boolean(required=True)
    
    squad =  graphene.Field(RestrictedSquadType)
    
    @login_required
    def mutate(self, info, token, service, description, secret, costPrice, maxSize, isPublic):

        costPrice = int(costPrice * 100)
        
        squad = Squad(
            owner=info.context.user,
            service=service,
            description=description,
            secret=secret,
            cost_price=costPrice,
            maximum_size=maxSize,
            is_public=isPublic
        )
        
        #try:
        squad.save()
        return CreateSquad(squad=squad)
        # except:
        #    raise ValueError("Squad not created")
           
           
class UpdateSquad(graphene.Mutation):
    
    class Arguments:
        token = graphene.String(required=True)
        squadID = graphene.Int(required=True)
        #service = graphene.String(required=False)
        description = graphene.String(required=False)
        secret = graphene.String(required=False)
        maxSize = graphene.Int(required=False)
        isPublic = graphene.Boolean(required=False)
        #costPrice = graphene.Int(required=False)
    
    squad =  graphene.Field(RestrictedSquadType)
    
    @login_required
    def mutate(self, info, token, squadID, **kwargs):
        
        squad = Squad.objects.get(
            owner=info.context.user,
            id = squadID
        )
        
        values = {convert(key): val for key, val in kwargs.items()}
        try:
            for key, val in values.items():
                # if key == "cost_price":
                #     val *= 100
                #     set_members_to_pending(squad)
                    
                setattr(squad, key, val)
            squad.save()
            return UpdateSquad(squad=squad)
        except:
           raise ValueError("Squad not updated")
           
class CreateMembership(graphene.Mutation):
    
    class Arguments:
        token = graphene.String(required=True)
        squadID = graphene.Int(required=True)
    
    squadMembership =  graphene.Field(SquadMemberType)
    
    @login_required
    def mutate(self, info, token, squadID, **kwargs):
        
        squad = Squad.objects.get(
            id = squadID
        )
        
        try:
            squadMembership = SquadMember.objects.get(
                squad = squad,
                user = info.context.user
            )
        except:
            squadMembership = SquadMember()
        
        try:
            squadMembership.create_basic_squad_membership(squad=squad, user=info.context.user)
            return CreateMembership(squadMembership=squadMembership)
        except Exception as e:
           return e
           
           
class SquadInvite(graphene.Mutation):
    
    class Arguments:
        token = graphene.String(required=True)
        squadID = graphene.Int(required=True)
        invitedUserEmail = graphene.String(required=True)
    
    squadMembership =  graphene.Field(SquadMemberType)
    
    @login_required
    def mutate(self, info, token, squadID, invitedUserEmail, **kwargs):     
        squad = Squad.objects.get(
            id = squadID,
            owner = info.context.user
        )
        invitedUser = User.objects.get(email=invitedUserEmail)   
        
        try:
            activeMembership = SquadMember.objects.filter(
                squad = squad,
                user = invitedUser,
                status__gte = SquadMemberStatus.SUBSCRIBED
            )[0]
            return ValueError("Active membership already exists!")
        except:
            pass
            
        try:
            activeMembership = SquadMember.objects.filter(
                squad = squad,
                user = invitedUser,
                status = SquadMemberStatus.INVITED
            )[0]
            return ValueError("Invite has already been sent!")
        except:
            pass
            
        try:
            activeMembership = SquadMember.objects.filter(
                squad = squad,
                user = invitedUser,
                status = SquadMemberStatus.BANNED
            )[0]
            return ValueError("User has an active BAN!")
        except:
            pass
            
        
        try:
            squadMembership = SquadMember.objects.filter(
                squad = squad,
                user = invitedUser,
            )[0]
        except:
            squadMembership = SquadMember()
                
        try:
            squadMembership.create_invite_squad_membership(squad=squad, user=invitedUser)
            return SquadInvite(squadMembership=squadMembership)
        except Exception as e:
           return e
        

class Mutations(graphene.ObjectType):
    create_squad = CreateSquad.Field()
    update_squad = UpdateSquad.Field()
    create_membership = CreateMembership.Field()
    create_invite = SquadInvite.Field()

