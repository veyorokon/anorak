from . models import *
from . serializers import *
from core.models import User 
from rest_framework import status
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from core.authentication import SessionManager
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

#################################################
#############  GLOBAL VARIABLES  ################
#################################################
Session = SessionManager()
    
    
class SquadDetailAPI(APIView):
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)
    
    def get(self, request, *args, **kwargs):
        """
        List all User objects
        """
        squads = Squad.objects.all()
        serializer = SquadSerializer(squads, many=True)
        return Response(serializer.data)
    

class CreateSquadAPI(APIView):
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    
    def post(self, request, *args, **kwargs):
        """
        List all Dashboard Element objects
        """
        
        userData = request.data['user']
        u = Session.validate_request_with_session_token(request)
        print(u)
        print(request.data)
        return Response(
            '{"success":"false"}', 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    