"""
Custom forms for the request models
"""

##########################################################################
## Imports
##########################################################################

from . import errors
from django import forms
from django.utils import timezone
from subscription.models import SubscriptionAccount

##########################################################################
## Request Form for Account Management
##########################################################################

class AccountManagementForm(forms.Form):
    comment = forms.CharField(
        required=False,
        widget=forms.Textarea,
        initial="Successful"
    )

    def save(self, account, processingUser):
        try:
            account = self.form_action(account, processingUser)
        except errors.Error as e:
            error_message = str(e)
            self.add_error(None, error_message)
            raise
    
                
class ActivateForm(AccountManagementForm):

    def form_action(self, managementRequest, processingUser):
        return managementRequest.activate(
            comment=self.cleaned_data['comment'],
            processingUser=processingUser
        )