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
        email = request.data['email']
        try:
            user = User.objects.get(email=email)
        except:
            user = None
        return user
        
    def get_token_from_request(self, request):
        """
        Get the user object with the username
        """
        tokenKey = request.data['session_token']
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
        