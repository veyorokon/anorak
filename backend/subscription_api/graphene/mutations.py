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
    
    squad =  graphene.Field(SquadType)
    
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
        
        squad.save()
        return CreateSquad(squad=squad)

           
class UpdateSquad(graphene.Mutation):
    
    class Arguments:
        token = graphene.String(required=True)
        squadID = graphene.Int(required=True)
        description = graphene.String(required=False)
        secret = graphene.String(required=False)
    
    squad =  graphene.Field(SquadType)
    
    @login_required
    def mutate(self, info, token, squadID, description, secret, **kwargs):
        
        squad = Squad.objects.get(
            owner=info.context.user,
            id = squadID
        )
        
        values = {convert(key): val for key, val in kwargs.items()}
        try:
            for key, val in values.items():       
                if (key != 'cost_price' and key != "maximum_size" and key != "date_created"):             
                    setattr(squad, key, val)
            squad.save()
            return UpdateSquad(squad=squad)
        except:
           raise ValueError("Squad not updated!")
    
           
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
           
           
class CreateInvite(graphene.Mutation):
    
    class Arguments:
        token = graphene.String(required=True)
        squadID = graphene.Int(required=True)
        invitedUserEmail = graphene.String(required=True)
    
    squadMembership =  graphene.Field(SquadMemberType)
    
    @login_required
    def mutate(self, info, token, squadID, invitedUserEmail, **kwargs):     
        squad = Squad.objects.get(
            id = squadID,
            owner = info.context.user,
            is_active=True
        )
        invitedUser = User.objects.get(email=invitedUserEmail)   
        
        try:
            activeMembership = SquadMember.objects.filter(
                squad = squad,
                user = invitedUser,
                status__gte = SquadMemberStatus.SUBSCRIBED
            )[0]
            return ValueError("An active membership already exists!")
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
            return CreateInvite(squadMembership=squadMembership)
        except Exception as e:
           return e
           
           
class HandleInvite(graphene.Mutation):
    
    class Arguments:
        token = graphene.String(required=True)
        squadID = graphene.Int(required=True)
        wasAccepted = graphene.Boolean(required=True)
    
    squadMembership =  graphene.Field(SquadMemberType)
        
    @login_required
    def mutate(self, info, token, squadID, wasAccepted, **kwargs): 
        user = info.context.user
        squad = Squad.objects.get(id = squadID)
        squadMembership = SquadMember.objects.get(
            user = user,
            squad = squad,
            status = SquadMemberStatus.INVITED
        )
        if(wasAccepted):
            squadMembership.accept_invite()
        else:
            squadMembership.reject_invite()
        return HandleInvite(squadMembership=squadMembership)
        
        
class DeactivateMembership(graphene.Mutation):
    
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
                user = info.context.user,
                status = SquadMemberStatus.SUBSCRIBED
            )
        except:
            return ValueError("An active membership for this squad does not exist!")
        
        try:
            squadMembership.deactivate_membership()
            return DeactivateMembership(squadMembership=squadMembership)
        except Exception as e:
           return e
           

class DeactivateSquad(graphene.Mutation):
    
    class Arguments:
        token = graphene.String(required=True)
        squadID = graphene.Int(required=True)
    
    squad =  graphene.Field(SquadType)
    
    @login_required
    def mutate(self, info, token, squadID):
        user = info.context.user
        
        squad = Squad.objects.get(
            owner = user,
            id = squadID,
            is_active = True
        )
        
        squad.deactivate()
        return DeactivateSquad(squad = squad)
            

class Mutations(graphene.ObjectType):
    # Create a new squad
    create_squad = CreateSquad.Field(description="Create a new squad.")
    # Modify fields for a squad
    update_squad = UpdateSquad.Field(description="Modify fields of a squad: i.e. description, secret.")
    # Create membership used for joining squads users search for.
    create_membership = CreateMembership.Field(description="Creates a membership for a squad a user has searched for.") 
    # Create an invite for another user
    create_invite = CreateInvite.Field(description="Create an invite from the squad owner to another user.")
    # Join or reject invite to a squad
    handle_invite = HandleInvite.Field(description="Join or reject invite to a squad.")
    # Unisubscribe a member from the squad
    deactivate_membership = DeactivateMembership.Field(description="Unsubscribe a member from the squad.")
    # Deactivates the squad and terminates all members from the squad
    deactivate_squad = DeactivateSquad.Field(description="Deactivates a squad and terminates all active member subscriptions.")

