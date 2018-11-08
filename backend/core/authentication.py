from . models import User 
from rest_framework.authtoken.models import Token
import requests

from django.conf import settings
clientId = settings.FACEBOOK_CLIENT_ID
clientSecret = settings.FACEBOOK_CLIENT_SECRET

class SessionManager(object):
        
    def logout(self, user):
        user.generate_new_session_token()  
        
    def validate_request_with_facebook_token(self, request):
        requestData = request.data
        userToken = requestData['facebookAccessToken']        
        appLink = 'https://graph.facebook.com/oauth/access_token?client_id=' + clientId + '&client_secret=' + clientSecret + '&grant_type=client_credentials'
        appToken = requests.get(appLink).json()['access_token']
        
        link = 'https://graph.facebook.com/debug_token?input_token=' + userToken + '&access_token=' + appToken
        try:
            userData = requests.get(link).json()['data']
        except (ValueError, KeyError, TypeError) as error:
            return error
        return userData
        
    def get_user_from_request_with_email(self, request, createIfNotFound=True):
        try:
            email = request.data['email']
            if createIfNotFound:
                return User.objects.get_or_create(email=email)[0]
            return User.objects.get(email=email)
        except:
            return None
            
    def validate_web_user_token(self, request):
        user_token = request.data['user_token']
        session_token = request.data['session_token']
        try:
            user = User.objects.get(email=user_token)
            token = Token.objects.get(key=session_token)
            return self.validate_user_with_token(user, token)
        except:
            return False, None
        
            
    
            
