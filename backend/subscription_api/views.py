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


class SquadMemberDetailAPI(APIView):
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)
    
    def get(self, request, *args, **kwargs):
        """
        List all User objects
        """
        memberships = SquadMember.objects.all()
        serializer = SquadMemberSerializer(memberships, many=True)
        return Response(serializer.data)


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
        username = formData['username']
        password = formData['password']
        
        Squad.objects.create(
            owner=user, 
            service=service,
            maximum_size=maximum_size,
            cost_price=cost_price,
            username=username,
            password=password
        )
    

class DashboardAPI(APIView):
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    
    def post(self, request, *args, **kwargs):
        """
        List all Dashboard Element objects
        """
        
        userData = request.data['user']
        isSessionValid, user = self.validate_session(request)
        if(isSessionValid):
            memberships = self.get_dashboard(user)
            serializer = SquadMemberSerializer(memberships, many=True)
            return Response(serializer.data)
            
        return Response(
            '{"success":"false"}', 
            status=status.HTTP_400_BAD_REQUEST
        )
            
    def validate_session(self, request):
        return Session.validate_request_with_session_token(request)
    
    def get_dashboard(self, user):
        return SquadMember.objects.filter(user=user)
        
        
class CreateWebSubscriberAPI(APIView):
    #authentication_classes = (SessionAuthentication, BasicAuthentication)
    
    def post(self, request, *args, **kwargs):
        """
        List all Dashboard Element objects
        """
        data = request.data['data']
        serviceID = data['serviceID']
        if(self.validate_service_with_id(serviceID)):
            user = self.get_user_from_data_with_phone_number(data)
            if(user):
                print('user exists')
            else:
                user = self.create_user_from_form(data)
                self.save_card_to_user_customer(user, data)
                self.create_squad_member(user, serviceID)
            return Response(
                '{"success":"true"}', 
                status=status.HTTP_200_OK
            )
        
        return Response(
            '{"success":"false"}', 
            status=status.HTTP_400_BAD_REQUEST
        )
        
    def get_service_from_id(self, serviceID):
        serviceFormData = serviceID.split('_')
        service = serviceFormData[0]
        id = serviceFormData[1]
        try:
            squad = Squad.objects.get(pk=int(id))
            return squad
        except:
            return None
        
    def validate_service_with_id(self, serviceID):
        serviceFormData = serviceID.split('_')
        service = serviceFormData[0]
        id = serviceFormData[1]
        try:
            if(Squad.objects.get(pk=int(id)).service == service):
                return True
        except:
            return False
        
    def get_user_from_data_with_phone_number(self, request):
        """
        Retrieves the user matching the credentials or returns None
        """
        phone_number = request['phone_number']
        try:
            user = User.objects.get(
                phone_number = phone_number
            )
        except:
            user = None
        return user
        
    def create_user_from_form(self, data):
        phone_number = data['phone_number']
        email = data['email']
        first_name = data['name'].split(' ')[0]
        last_name = data['name'].split(' ')[1]
        
        return User.objects.create(
            phone_number=phone_number,
            email=email,
            first_name=first_name,
            last_name=last_name
        )
        
    def save_card_to_user_customer(self, user, data):
        token = data['tokenID']
        return user.stripe_customer.link_card(token)
        
    def create_squad_member(self, user, serviceID):
        squad = self.get_service_from_id(serviceID)
        newMember = SquadMember()
        newMember.create_basic_squad_membership(
            squad=squad,
            user=user
        )
        newMember.save()