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


class StripePlanDetailAPI(APIView):
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)
    
    def get(self, request, *args, **kwargs):
        """
        List all User objects
        """
        plans = StripePlan.objects.all()
        serializer = StripePlanSerializer(plans, many=True)
        return Response(serializer.data)

    
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
        isSessionValid, user = self.validate_session(request)
        if(isSessionValid):
            self.create_squad(user, request)
            return Response(
                '{"success":"true"}', 
                status=status.HTTP_200_OK
            )
        
        return Response(
            '{"success":"false"}', 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    def validate_session(self, request):
        return Session.validate_request_with_session_token(request)
        
    def format_price(self, price):
        return round(100*float(price))
        
    def create_squad(self, user, request):
        formData = request.data['form']
        cost_price = self.format_price(formData['cost_price'])
        service = formData['service']
        maximum_size = formData['maximum_size']
        Squad.objects.create(
            owner=user, 
            service=service,
            maximum_size=maximum_size,
            cost_price=cost_price
        )
    
    