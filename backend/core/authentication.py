from . models import User 

class SessionManager(object):
    
    def authenticate(self, request):
        return self.validate_request_with_session_token(request)
    
    def validate_request_with_session_token(self, request):
        """
        Checks if the user and token are in a valid session
        """
        user = self.get_user_from_request(request)
        session_token = request.data['session_token']
        if(user):
            isUserValidated = user.validate_session_token(session_token)
            return True, user
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
        
    def logout(self, user):
        user.delete_session_token()        
        