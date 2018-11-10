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
        service = graphene.String()
        password = graphene.String()
        username = graphene.String()
        costPrice = graphene.Int()
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

class Query(graphene.ObjectType):
    user_squad_memberships = graphene.List(SquadMemberType, token=graphene.String(required=True))
    
    @login_required
    def resolve_user_squad_memberships(self, info, token, **kwargs):
        return info.context.user.squad_memberships.all()
