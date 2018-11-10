import graphene 
from graphene_django.types import DjangoObjectType
from . models import * 
from graphql_jwt.decorators import login_required, staff_member_required
import graphql_jwt

from . authentication import FacebookManager

FBManager = FacebookManager()

class UserType(DjangoObjectType):
    class Meta:
        model = User
        
class FacebookUser(graphene.Mutation):
    
    class Arguments:
        facebookAccessToken = graphene.String(required=True)
        email = graphene.String(required=True)
    
    token =  graphene.String()
    
    def mutate(self, info, facebookAccessToken, email):
        facebook_id = FBManager.validate_token(facebookAccessToken)
        if(facebook_id):
            user = User.objects.get_or_create(
                email=email
            )[0]
            user.facebook_id = facebook_id
        try:
            user.save()
            token = user.json_web_token
            return CreateUser(token=token)
        except:
            raise ValueError("User not created")
        
class CreateUser(graphene.Mutation):
    
    class Arguments:
        email = graphene.String(required=True)
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
    get_facebook_user = FacebookUser.Field()

        
class Query(graphene.ObjectType):
    all_users = graphene.List(UserType, token=graphene.String(required=True))
    user = graphene.Field(UserType, token=graphene.String(required=True))
    
    @login_required
    def resolve_user(self, info, token, **kwargs):
        return info.context.user
    