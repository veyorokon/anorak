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

class CreateBillingAddress(graphene.Mutation):
    
    class Arguments:
        line1 = graphene.String(required=True)
        line2 = graphene.String()
        city = graphene.String(required=True)
        state = graphene.String(required=True)
        zip = graphene.Int(required=True)
        token=graphene.String(required=True)
    
    address =  graphene.Field(BillingAddressType)
    
    @login_required
    def mutate(self, info, token, line1, line2, city, state, zip):
        user = info.context.user
        try:
            address = user.address_billing
            if address == None:
                address = BillingAddress()
            address.line_1=line1
            address.line_2=line2
            address.city=city
            address.state=state
            address.zip=zip
            address.save()
            user.address_billing = address
            user.save()
            return CreateBillingAddress(address=address)
        except:
          raise ValueError("Billing address not created")
            

class CreateShippingAddress(graphene.Mutation):
    
    class Arguments:
        line1 = graphene.String(required=True)
        line2 = graphene.String()
        city = graphene.String(required=True)
        state = graphene.String(required=True)
        zip = graphene.Int(required=True)
        token=graphene.String(required=True)
    
    address =  graphene.Field(ShippingAddressType)
    
    @login_required
    def mutate(self, info, token, line1, line2, city, state, zip):
        user = info.context.user
        try:
            address = user.address_shipping
            if address == None:
                address = ShippingAddress()
            address.line_1=line1
            address.line_2=line2
            address.city=city
            address.state=state
            address.zip=zip
            address.save()
            user.address_shipping = address
            user.save()
            return CreateShippingAddress(address=address)
        except:
            raise ValueError("Shipping address not created")
        

class Mutations(graphene.ObjectType):
    create_user = CreateUser.Field()
    get_facebook_user = FacebookUser.Field()
    set_user_billing_address = CreateBillingAddress.Field()
    set_user_shipping_address = CreateShippingAddress.Field()
    
