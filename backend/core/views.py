
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
        user = self.get_new_or_inactive_user_else_none(request)
        conflicts = self.check_user_form_for_conflicts(request, user)
        if(conflicts):
            return Response(
                {'errors': conflicts}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        if(user):
            serialized_user = get_serialized_user(user)
            return Response(
                serialized_user.data, 
                status=status.HTTP_201_CREATED
            )
        return Response(
            '{"success":"false"}', 
            status=status.HTTP_400_BAD_REQUEST
        )
        
        
    def get_session_token_from_request(self, request):
        """
        Extracts the session token from the URL
        """
        session_token = request.GET.get('session_token')
        return json.loads(session_token)['session_token']
    
    
    def get_new_or_inactive_user_else_none(self, request):
        """
        Retrieves the user matching the credentials or returns None 
        """
        session_token = self.get_session_token_from_request(request)
        phone_number = request.data['user']['phone_number']
        try:
            user = User.objects.get(
                session_token__key = session_token,
                phone_number = phone_number
            )
            ## NOTE: Add check if user is active and raise exception
            self.update_user(user, request)
        except:
            user = None
        return user
        
        
    def update_user(self, user, request):
        """
        Updates the user's password
        """
        password = request.data['user']['password']
        email = request.data['user']['email']
        user.set_password(password)
        user.email = email
        user.save()
        
        
    def check_user_form_for_conflicts(self, request, user):
        """
        Builds kwargs as dictionary of fields and values to check for conflicts
        """
        errors = {"email":0, "phone_number":0}
        email = request.data['user']['email']
        phone_number = request.data['user']['phone_number']
        if(user == None):
            return None
        instancePk = user.pk
        kwargs = {
            'data':
                [
                    {'email': email}, 
                    {'phone_number': phone_number}, 
                ]
            }
        return self.get_conflicts(instancePk, **kwargs)
        
        
    def get_conflicts(self, instancePk, **kwargs):
        """
        Searches for all users with conflicting (unique) kwargs fields
        """
        conflicts = []
        for query in kwargs['data']:            
            user = User.objects.filter(**query).exclude(pk=instancePk)
            if(user):
                (field, value), = query.items()
                conflicts.append(field)
        if(len(conflicts)==0):
            return None
        return conflicts
        

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
        Session.logout(user)
        return Response(
            '{"success":"true"}', 
            status=status.HTTP_200_OK
        )
                