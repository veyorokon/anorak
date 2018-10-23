from . models import User 
from rest_framework.authtoken.models import Token

class SessionManager(object):
    
    def authenticate(self, request):
        return self.validate_request_with_session_token(request)
    
    def validate_request_with_session_token(self, request):
        """
        Checks if the user and token are in a valid session
        """
        user = self.get_user_from_request(request)
        token = self.get_token_from_request(request)
        if(user and token):
            return self.validate_user_with_token(user, token)
        return False, user
        
    def get_user_from_request(self, request):
        """
        Get the user object with the username
        """
        phone_number = None
        if('phone_number' in request.data):
            phone_number = request.data['phone_number']
        elif('user' in request.data):
            phone_number = request.data['user']['phone_number']
        try:
            user = User.objects.get(phone_number=phone_number)
        except:
            user = None
        return user
        
    def get_token_from_request(self, request):
        """
        Get the user object with the username
        """
        tokenKey = None
        if('session_token' in request.data):
            tokenKey = request.data['session_token']
        elif('user' in request.data):
            tokenKey = request.data['user']['session_token']['key']
        try:
            token = Token.objects.get(key=tokenKey)
        except:
            token = None
        return token
        
    def logout(self, user):
        user.generate_new_session_token()  
    
    def validate_user_with_token(self, user, token):
        if(token.user == user):
            return True, user
        return False, user
        