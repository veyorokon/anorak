from . models import *
from . serializers import *
from django.conf import settings
from rest_framework import status
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

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


class PhoneVerificationCodeAPI(APIView):
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    
    def get(self, request, *args, **kwargs):
        codes = PhoneVerificationCode.objects.all()
        serializer = PhoneVerificationCodeserializer(codes, many=True)
        return Response(serializer.data)
        
        
    def post(self, request, *args, **kwargs):
        isRequestingCode = request.data['isRequestingCode']
        if(isRequestingCode):
            return self.post_is_requesting_verification_code(request)
        else:
            return self.post_is_submitting_verification_code(request)
        

    def post_is_requesting_verification_code(self, request):
        """
        The POST is reqesting a new verification code
        """
        phone_number = request.data['phone_number']
        code = PhoneVerificationCode.objects.get_or_create(phone_number=phone_number)[0]
        code.generate_new_code()
        isTextDelivered = code.text_verification_code()
        if(isTextDelivered):
            return Response('{"success":"true"}', status=status.HTTP_201_CREATED)
        return Response('{"success":"false"}', status=status.HTTP_400_BAD_REQUEST)
        

    def post_is_submitting_verification_code(self, request):
        """
        The POST is submitting a code for verification
        """
        phoneNumber = request.data['phone_number']
        code = request.data['code']
        try:
            phone_verification_code = PhoneVerificationCode.objects.get(code=code, 
                phone_number=phoneNumber)
            user = phone_verification_code.validate_phone_number()
            return Response(
                {'session_token': user.session_token.key}, 
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                '{"success":"false"}', 
                status=status.HTTP_400_BAD_REQUEST
            )