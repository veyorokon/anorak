from . models import *
from . serializers import *
from rest_framework import status
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

# Create your views here.
class EmailVerificationCodeAPI(APIView):
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    
    def get(self, request, *args, **kwargs):
        codes = EmailVerificationCode.objects.all()
        serializer = EmailVerificationCodeserializer(codes, many=True)
        return Response(serializer.data)
        
    def post(self, request, *args, **kwargs):
        email = request.data['email']
        code = EmailVerificationCode.objects.get_or_create(email=email)[0]
        code.generate_new_code()
        isEmailDelivered = code.email_verification_code()
        code.validate()
        if(isEmailDelivered):
            return Response('{"success":"true"}', status=status.HTTP_201_CREATED)
        return Response('{"success":"false"}', status=status.HTTP_400_BAD_REQUEST)
