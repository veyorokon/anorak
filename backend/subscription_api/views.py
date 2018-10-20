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


class DashboardAPI(APIView):
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)
    
    def get(self, request, *args, **kwargs):
        """
        List all Dashboard Element objects
        """
        isSessionValidated = self.is_session_validated(request)
        if(isSessionValidated):
            serializer = self.get_user_dashboard_elements(request)
            return Response(serializer)
        return Response({'data':[]})
        
    
    def is_session_validated(self, request):
        """
        Verifies is the user who sent the response owns the session token
        """
        user = request.user
        session_token = request.GET.get('session_token')
        try:
            isSessionValidated = user.validate_session_token(session_token)
        except:
            isSessionValidated = False
        return isSessionValidated
    
        
    def get_user_dashboard_elements(self, request):
        """
        Queries for a list of dashboard elements belonging to the user
        """
        user = request.user
        elements = SquadDashboardElement.objects.filter(user=user)
        if(elements):
            serializer = DashboardElementserializer(elements, many=True)
            return serializer.data
        return {'data':[]}
    
    

class CreateSquadAPI(APIView):
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    
    def post(self, request, *args, **kwargs):
        """
        List all Dashboard Element objects
        """
        
        userData = request.data['user']
        user = User.objects.get(pk=4)
        u = Session.validate_request_with_session_token(request)
        print(u)
        return Response(
            '{"success":"false"}', 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    