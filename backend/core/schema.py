import graphene 
from graphene_django.types import DjangoObjectType
from . models import * 
from graphql_jwt.decorators import login_required, staff_member_required
import graphql_jwt

class UserType(DjangoObjectType):
    class Meta:
        model = User
        
class CreateUser(graphene.Mutation):
    
    class Arguments:
        email = graphene.String()
        password = graphene.String()
        firstName = graphene.String()
        lastName = graphene.String()
    
    token =  graphene.String()
    
    def mutate(self, info, email, password, firstName, lastName):
        user = User(
            email=email,
            first_name=firstName,
            last_name=lastName
        )
        user.set_password(password)
        try:
            user.save()
            token = user.json_web_token
            return CreateUser(token=token)
        except:
            raise ValueError("User not created")
        

class Mutations(graphene.ObjectType):
    create_user = CreateUser.Field()

        
class Query(graphene.ObjectType):
    all_users = graphene.List(UserType, token=graphene.String(required=True))
    user = graphene.Field(UserType, token=graphene.String(required=True))
    
    @login_required
    def resolve_user(self, info, token, **kwargs):
        return info.context.user
    
    @staff_member_required
    def resolve_all_users(self, info, token, **kwargs):
        return User.objects.all()
