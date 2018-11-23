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
        
        try:
            squad.save()
            return CreateSquad(squad=squad)
        except:
           raise ValueError("Squad not created")
           
           
class UpdateSquad(graphene.Mutation):
    
    class Arguments:
        token = graphene.String(required=True)
        squadID = graphene.Int(required=True)
        service = graphene.String(required=False)
        description = graphene.String(required=False)
        secret = graphene.String(required=False)
        maxSize = graphene.Int(required=False)
        isPublic = graphene.Boolean(required=False)
        costPrice = graphene.Int(required=False)
    
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
                if key == "cost_price":
                    val *= 100
                    set_members_to_pending(squad)
                    
                setattr(squad, key, val)
            squad.save()
            return UpdateSquad(squad=squad)
        except:
           raise ValueError("Squad not updated")
        

class Mutations(graphene.ObjectType):
    create_squad = CreateSquad.Field()
    update_squad = UpdateSquad.Field()

