from rest_framework import serializers
from . models import *

class EmailVerificationCodeserializer(serializers.ModelSerializer):

    class Meta:
        model = EmailVerificationCode
        fields = '__all__'
