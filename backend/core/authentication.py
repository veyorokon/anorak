from . models import User 
from rest_framework.authtoken.models import Token
import requests

from django.conf import settings
clientId = settings.FACEBOOK_CLIENT_ID
clientSecret = settings.FACEBOOK_CLIENT_SECRET

from rest_framework import status, exceptions
from django.http import HttpResponse
from rest_framework.authentication import get_authorization_header, BaseAuthentication
import jwt
import json

from rest_framework_jwt.settings import api_settings
jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

class TokenAuthentication(BaseAuthentication):

    model = None

    def get_model(self):
        return User
        
    def manually_generate_token(self, user):
        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)
        return token

    def authenticate(self, request):
        auth = get_authorization_header(request).split()
        if not auth or auth[0].lower() != b'token':
            return None

        if len(auth) == 1:
            msg = 'Invalid token header. No credentials provided.'
            raise exceptions.AuthenticationFailed(msg)
        elif len(auth) > 2:
            msg = 'Invalid token header'
            raise exceptions.AuthenticationFailed(msg)

        try:
            token = auth[1]
            if token=="null":
                msg = 'Null token not allowed'
                raise exceptions.AuthenticationFailed(msg)
        except UnicodeError:
            msg = 'Invalid token header. Token string should not contain invalid characters.'
            raise exceptions.AuthenticationFailed(msg)

        return self.authenticate_credentials(token)

    def authenticate_credentials(self, token):
        model = self.get_model()
        payload = jwt.decode(token, "SECRET_KEY")
        email = payload['email']
        userid = payload['id']
        msg = {'Error': "Token mismatch",'status' :"401"}
        try:
            
            user = User.objects.get(
                email=email,
                id=userid,
                is_active=True
            )
            
            if not user.token['token'] == token:
                raise exceptions.AuthenticationFailed(msg)
               
        except jwt.ExpiredSignature or jwt.DecodeError or jwt.InvalidTokenError:
            return HttpResponse({'Error': "Token is invalid"}, status="403")
        except User.DoesNotExist:
            return HttpResponse({'Error': "Internal server error"}, status="500")

        return (user, token)

    def authenticate_header(self, request):
        return 'Token'
    
class FacebookManager(object):
        
    def validate_token(self, facebookAccessToken):  
        appLink = 'https://graph.facebook.com/oauth/access_token?client_id=' + clientId + '&client_secret=' + clientSecret + '&grant_type=client_credentials'
        appToken = requests.get(appLink).json()['access_token']
        
        link = 'https://graph.facebook.com/debug_token?input_token=' + facebookAccessToken + '&access_token=' + appToken
        try:
            userData = requests.get(link).json()['data']
            if(userData['is_valid']):
                return userData['user_id']
            else:
                return None
        except (ValueError, KeyError, TypeError) as error:
            return error
        return userData
        

class SessionManager(object):
        
    # def logout(self, user):
    #     user.generate_new_session_token()  
        
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
        
            
    
            
