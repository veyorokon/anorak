
from . models import *
from . serializers import *
from rest_framework import status
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from . authentication import SessionManager
from subscription_api.models import SquadMember
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from subscription_api.serializers import SquadMemberSerializer
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

def get_dashboard(user):
    memberships = SquadMember.objects.filter(user=user)
    dashboard = SquadMemberSerializer(memberships, many=True)
    dashboardData = {}
    for element in dashboard.data:
        for key in element.items():
            index = key[0]
            data = key[1]
            dashboardData[index] = data
    return(dashboardData)

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


class UserFacebookAuthAPI(APIView):
    authentication_classes = (SessionAuthentication, BasicAuthentication)

    def post(self, request, *args, **kwargs):
        """
        Updates the user object with Facebook info and returns user + dash
        """
        facebookData = Session.validate_request_with_facebook_token(request)
        user = Session.get_user_from_request_with_email(request,createIfNotFound=True)
        self.update_user_with_facebook_data(user, facebookData)
        return Response(
            {
                'session_token':user.session_token.key,
                'email':user.email
            },
            status=status.HTTP_201_CREATED
        )
        
    def update_user_with_facebook_data(self, user, facebookData):
        user.facebook_id = facebookData['user_id']
        user.save()


class UserWebCreationAPI(APIView):
    authentication_classes = (SessionAuthentication, BasicAuthentication)

    def post(self, request, *args, **kwargs):
        """
        Creates a new user ONLY if one did not exist.
        """
        userAlreadyExists = self.check_if_user_already_exists(request)
        if(userAlreadyExists):
            return Response(
                {
                    'error':'Email is already being used.'
                },
                status=status.HTTP_409_CONFLICT
            )
        
        user = Session.get_user_from_request_with_email(request,createIfNotFound=True)
        self.set_user_fields(user, request)
        return Response(
            {
                'session_token':user.session_token.key,
                'email':user.email
            },
            status=status.HTTP_201_CREATED
        )
    
    def check_if_user_already_exists(self, request):
        user = Session.get_user_from_request_with_email(request, createIfNotFound=False)
        if(user):
            return True
        return False
        
    def parse_first_and_last_name(self, fullName):
        try:
            first_name = fullName.split(' ')[0]
            last_name = fullName.split(' ')[1]
        except:
            first_name = fullName
            last_name = None
        return first_name, last_name
        
    def set_user_fields(self, user, request):
        requestData = request.data
        user.set_password(requestData['password'])
        first_name, last_name = self.parse_first_and_last_name(requestData['fullName'])
        user.first_name, user.last_name = first_name, last_name
        user.save()


class UserWebDashboardAPI(APIView):
    authentication_classes = (SessionAuthentication, BasicAuthentication)

    def post(self, request, *args, **kwargs):
        """
        Creates a new user ONLY if one did not exist.
        """
        isSessionValid, user = Session.validate_web_user_token(request)
        if(isSessionValid):
            return Response(
                {
                    'dashboard': get_dashboard(user)
                },
                status=status.HTTP_200_OK
            )
        return Response(
            {},
            status=status.HTTP_400_BAD_REQUEST
        )
