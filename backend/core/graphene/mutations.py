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

class SetBillingAddress(graphene.Mutation):
    
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
            return SetBillingAddress(address=address)
        except:
          raise ValueError("Billing address not created")
            

class SetShippingAddress(graphene.Mutation):
    
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
            return SetShippingAddress(address=address)
        except:
            raise ValueError("Shipping address not created")

class AddStripeCardSetAddress(graphene.Mutation):
    
    class Arguments:
        line1 = graphene.String(required=True)
        line2 = graphene.String()
        city = graphene.String(required=True)
        state = graphene.String(required=True)
        zip = graphene.Int(required=True)
        cardToken=graphene.String(required=True)
        token=graphene.String(required=True)
        
    stripeCustomer = graphene.Field(StripeCustomerType)
    
    @login_required
    def mutate(self, info, token, cardToken, line1, line2, city, state, zip):
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
            user.stripe_customer.link_card(cardToken)
            user.stripe_customer.save()
            user.save()
            return AddStripeCardSetAddress(stripeCustomer=user.stripe_customer)
        except:
          raise ValueError("Error when updating address and card")


class AddStripeCard(graphene.Mutation):
    
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
            return AddStripeCard(stripeCustomer=user.stripe_customer)
        except:
          raise ValueError("Billing address not created")

class Mutations(graphene.ObjectType):
    user = CreateUser.Field()
    facebook_user = FacebookUser.Field()
    set_user_billing_address = SetBillingAddress.Field()
    set_user_shipping_address = SetShippingAddress.Field()
    add_stripe_card_set_user_address = AddStripeCardSetAddress.Field()
    add_stripe_card = AddStripeCard.Field()
    
