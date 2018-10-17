from rest_framework import serializers
from . models import *

class EmailVerificationCodeserializer(serializers.ModelSerializer):

    class Meta:
        model = EmailVerificationCode
        fields = '__all__'

class PhoneVerificationCodeserializer(serializers.ModelSerializer):

    class Meta:
        model = PhoneVerificationCode
        fields = '__all__'
