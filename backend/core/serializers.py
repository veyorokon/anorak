from rest_framework import serializers
from . models import *

class StripeCustomerserializer(serializers.ModelSerializer):

    class Meta:
        model = StripeCustomer
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    
    stripe_customer = StripeCustomerserializer(required=True)

    class Meta:
        model = User
        fields = '__all__'