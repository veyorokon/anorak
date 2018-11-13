import graphene 
from . types import *
from graphql_jwt.decorators import login_required

class CreateSquad(graphene.Mutation):
    
    class Arguments:
        service = graphene.String(required=True)
        secret = graphene.String()
        costPrice = graphene.Int(required=True)
        token=graphene.String(required=True)
    
    squad =  graphene.Field(RestrictedSquadType)
    
    @login_required
    def mutate(self, info, token, service, secret, costPrice):
        squad = Squad(
            owner=info.context.user,
            service=service,
            secret=secret,
            cost_price=costPrice
        )
        
        try:
            squad.save()
            return CreateSquad(squad=squad)
        except:
            raise ValueError("Squad not created")
        

class Mutations(graphene.ObjectType):
    create_squad = CreateSquad.Field()
