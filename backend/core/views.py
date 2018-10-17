
from . models import *
from . serializers import *
from rest_framework import status
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
import json

def get_serialized_user(user):
    """
    Serializes the user object
    """
    serializer = UserSerializer(user, many=False)
    return serializer


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
        if(user):
            conflicts = self.check_user_form_for_conflicts(request, user.pk)
            if(conflicts):
                return Response(
                    {'errors': conflicts}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
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
        
        
    def check_user_form_for_conflicts(self, request, instancePk):
        """
        Builds kwargs as dictionary of fields and values to check for conflicts
        """
        errors = {"email":0, "phone_number":0}
        email = request.data['user']['email']
        kwargs = {
            'data':
                [
                    {'email': email}, 
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
        isSessionValid, user = self.get_valid_session_login(request)
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
        
    def get_valid_session_login(self, request):
        """
        Checks if the user and token are in a valid session
        """
        user = self.get_user_from_request_username(request)
        session_token = request.data['session_token']
        if(user):
            isUserValidated = user.validate_session_token(session_token)
            return True, user
        return False, user
        
        
    def get_user_from_request_username(self, request):
        """
        Get the user object with the username
        """
        email = request.data['email']
        try:
            user = User.objects.get(email=email)
        except:
            user = None
        return user
        
    