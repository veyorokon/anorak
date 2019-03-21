import json
import requests
from django.conf import settings
clientId = settings.FACEBOOK_CLIENT_ID
clientSecret = settings.FACEBOOK_CLIENT_SECRET


class FacebookManager(object):
        
    def validate_token(self, facebookAccessToken):  
        appLink = """https://graph.facebook.com/oauth/access_token?client_id={}&client_secret={}&grant_type=client_credentials""".format(clientId, clientSecret)
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
