##########################################################################
## Email Manager
##########################################################################

"""
Custom email manager to for stripe invoices
"""

##########################################################################
## Imports
##########################################################################

from mail_templated import EmailMessage
from django.conf import settings

class EmailVerificationMessage(object):

    def __init__(self, user, code):
        self.user = user
        self.code = code

    def email_verification(self):
        activateUrl = settings.FRONTEND_URL+"/dashboard/home/"+self.code
        message = EmailMessage('emailVerification.tpl',
            {'user': self.user, 'activateUrl': activateUrl},
            'noreply@ianorak.com',
            to =[self.user.email]
        )
        message.send()
