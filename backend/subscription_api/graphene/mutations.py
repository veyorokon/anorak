import graphene 
from . types import *
from graphql_jwt.decorators import login_required

class CreateSquad(graphene.Mutation):
    
    class Arguments:
        service = graphene.String(required=True)
        description = graphene.String(required=True)
        secret = graphene.String()
        costPrice = graphene.Float(required=True)
        maxSize = graphene.Int(required=True)
        token=graphene.String(required=True)
    
    squad =  graphene.Field(RestrictedSquadType)
    
    @login_required
    def mutate(self, info, token, service, description, secret, costPrice, maxSize):

        costPrice = int(costPrice * 100)
        
        squad = Squad(
            owner=info.context.user,
            service=service,
            description=description,
            secret=secret,
            cost_price=costPrice,
            maximum_size=maxSize
        )
        
        try:
            squad.save()
            return CreateSquad(squad=squad)
        except:
           raise ValueError("Squad not created")
        

class Mutations(graphene.ObjectType):
    create_squad = CreateSquad.Field()

