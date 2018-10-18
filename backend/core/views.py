
from . models import *
from . serializers import *
from rest_framework import status
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from . authentication import SessionManager
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
import json

#################################################
#############  GLOBAL VARIABLES  ################
#################################################
Session = SessionManager()

def get_serialized_user(user):
    """
    Serializes the user object
    """
    serializer = UserSerializer(user, many=False)
    return serializer


#################################################
############   CLASS VIEWS & API  ###############
#################################################


class UserDetailAPI(APIView):
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)
    
    def get(self, request, *args, **kwargs):
        """
        List all User objects
        """
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
        
        
        
class UserCreationAPI(APIView):
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    
    def post(self, request, *args, **kwargs):
        """
        Updates the user object
        """
        print(request.data)
        sessionValidated, user = self.validate_session(request)
        if(sessionValidated):
            serialized_user = get_serialized_user(user)
            return Response(
                serialized_user.data, 
                status=status.HTTP_201_CREATED
            )
        return Response(
            '{"success":"false"}', 
            status=status.HTTP_400_BAD_REQUEST
        )
        
    def validate_session(self, request):
        """
        Returns session validation bool and the user
        """
        user = self.get_user_from_request_with_phone_number(request)
        session_token = self.get_session_token_from_request(request)
        if (user == None):
            return False, None
        return user.validate_session_token(session_token), user
            
            
    def get_session_token_from_request(self, request):
        """
        Extracts the session token from the URL
        """
        session_token = request.data['session_token']
        return session_token
    
    
    def get_user_from_request_with_phone_number(self, request):
        """
        Retrieves the user matching the credentials or returns None 
        """
        phone_number = request.data['user']['phone_number']
        try:
            user = User.objects.get(
                phone_number = phone_number
            )
        except:
            user = None
        return user
        
        
class UserTokenLoginAPI(APIView):
    authentication_classes = (SessionAuthentication, BasicAuthentication)
        
    def post(self, request, *args, **kwargs):
        """
        Updates the user object
        """
        isSessionValid, user = Session.authenticate(request)
        if(isSessionValid and user):
            serialized_user = get_serialized_user(user)
            return Response(
                serialized_user.data, 
                status=status.HTTP_200_OK
            )
        return Response(
            '{"success":"false"}', 
            status=status.HTTP_400_BAD_REQUEST
        )
    

class UserLogoutAPI(APIView):
    authentication_classes = (SessionAuthentication, BasicAuthentication)
        
    def post(self, request, *args, **kwargs):
        """
        Updates the user object
        """
        isSessionValid, user = Session.authenticate(request)
        Session.logout(user)
        return Response(
            '{"success":"true"}', 
            status=status.HTTP_200_OK
        )
                