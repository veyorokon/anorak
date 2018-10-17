from rest_framework import serializers
from . models import *

class StripeCustomerserializer(serializers.ModelSerializer):

    class Meta:
        model = StripeCustomer
        fields = '__all__'
        

class UserSerializer(serializers.ModelSerializer):
    
    stripe_customer = StripeCustomerserializer(required=True)
    
    def create(self, validated_data):
        return User(**validated_data)
        
    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.password = validated_data.get('password', instance.password)
        instance.phone_number = validated_data.get(
            'phone_number', instance.phone_number
            )
        return instance

    class Meta:
        model = User
        fields = '__all__'