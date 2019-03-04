import graphene 
from . types import *
from core.models import * 
from core.authentication import FacebookManager
from graphql_jwt.decorators import login_required

FBManager = FacebookManager()

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
            return FacebookUser(token=token)
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
            
class UpdateUser(graphene.Mutation):
    
    class Arguments:
        token=graphene.String(required=True)
        firstName = graphene.String()
        lastName = graphene.String()
    
    user = graphene.Field(UserType)
    
    @login_required
    def mutate(self, info, token, firstName, lastName):
        user = info.context.user
        user.first_name = firstName
        user.last_name = lastName
        user.save()
        return UpdateUser(user=user)
        

class StripeCard(graphene.Mutation):
    
    class Arguments:
        cardToken=graphene.String(required=True)
        token=graphene.String(required=True)
        
    stripeCustomer = graphene.Field(StripeCustomerType)
    
    @login_required
    def mutate(self, info, token, cardToken):
        user = info.context.user
        try:
            user.stripe_customer.link_card(cardToken)
            user.stripe_customer.save()
            return StripeCard(stripeCustomer=user.stripe_customer)
        except:
          raise ValueError("Card not created")
          
class LoginUser(graphene.Mutation):
    
    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String()
    
    token =  graphene.String()
    
    def mutate(self, info, email, password):
        user = User.objects.get(email=email)
        if user.check_password(password):
            token = user.json_web_token
            return LoginUser(token=token)
        else:
            raise ValueError("User could not be logged in.")


class Mutations(graphene.ObjectType):
    create_user = CreateUser.Field(description="Creates a new user")
    update_user = UpdateUser.Field(description="Updates an existing user")
    facebook_user = FacebookUser.Field(description="Creates a new user with facebook data")
    set_stripe_card = StripeCard.Field(description="Creates a new stripe credit card for the user.")
    login_user = LoginUser.Field(description="Logs the user in.")
    
