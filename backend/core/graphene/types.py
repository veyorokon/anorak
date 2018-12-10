from graphene_django.types import DjangoObjectType
from core.models import * 

class StripeCustomerType(DjangoObjectType):
    class Meta:
        model = StripeCustomer
        exclude_fields = ['stripe_customer_id', 'stripe_credit_card_id']

class ShippingAddressType(DjangoObjectType):
    class Meta:
        model = ShippingAddress

class UserType(DjangoObjectType):
    class Meta:
        model = User
        exclude_fields = ['stripe_customer']
    
    def resolve_email(self, info):
        if info.context.user == self:
            return self.email
        return "Insufficient Permissions."
        
    def resolve_shipping_address(self, info):
        if info.context.user == self:
            return self.shipping_address
        return "Insufficient Permissions."
        
    def resolve_facebook_id(self, info):
        if info.context.user == self:
            return self.facebook_id
        return "Insufficient Permissions."
        
    def resolve_facebook_id(self, info):
        if info.context.user == self:
            return self.facebook_id
        return "Insufficient Permissions."
        
    def resolve_phone_number(self, info):
        if info.context.user == self:
            return self.phone_number
        return "Insufficient Permissions."
        
    def resolve_is_active(self, info):
        if info.context.user == self:
            return self.is_active
        return "Insufficient Permissions."
        
    def resolve_is_staff(self, info):
        if info.context.user == self:
            return self.is_staff
        return "Insufficient Permissions."

    def resolve_payment_method(self, info):
        if info.context.user == self:
            return self.payment_method
        return "Insufficient Permissions."
        
    def resolve_id(self, info):
        if info.context.user == self:
            return self.id
        return "Insufficient Permissions."
        
    def resolve_date_joined(self, info):
        if info.context.user == self:
            return self.date_joined
        return None
        
    def resolve_squad_memberships(self, info):
        if info.context.user == self:
            return self.squad_memberships
        return None
        
    def resolve_squad_set(self, info):
        if info.context.user == self:
            return self.squad_set
        return None
    
    def resolve_last_login(self, info):
        if info.context.user == self:
            return self.last_login
        return None
        