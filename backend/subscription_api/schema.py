import graphene 
from graphene_django.types import DjangoObjectType
from . models import * 
from graphql_jwt.decorators import login_required, staff_member_required
import graphql_jwt
from core.schema import UserType

class SquadType(DjangoObjectType):
    class Meta:
        model = Squad

class SquadMemberType(DjangoObjectType):
    class Meta:
        model = SquadMember
        
class CreateSquad(graphene.Mutation):
    
    class Arguments:
        service = graphene.String(required=True)
        password = graphene.String()
        username = graphene.String()
        costPrice = graphene.Int(required=True)
        token=graphene.String(required=True)
    
    squad =  graphene.Field(SquadType)
    
    @login_required
    def mutate(self, info, token, service, password, username, costPrice):
        squad = Squad(
            owner=info.context.user,
            service=service,
            username=username,
            password=password,
            cost_price=costPrice
        )
        
        try:
            squad.save()
            return CreateSquad(squad=squad)
        except:
            raise ValueError("Squad not created")
        

class Mutations(graphene.ObjectType):
    create_squad = CreateSquad.Field()

