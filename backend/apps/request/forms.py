"""
Custom forms for the request models
"""

##########################################################################
## Imports
##########################################################################

from . import errors
from django import forms
from django.utils import timezone
from subscription.models import SubscriptionAccount, SubscriptionPlan

##########################################################################
## Request Form for Account Management
##########################################################################

class AccountManagementForm(forms.Form):
    comment = forms.CharField(
        required=False,
        widget=forms.Textarea,
        initial="Created"
    )

    def save(self, account, processingUser):
        try:
            account = self.form_action(account, processingUser)
        except errors.Error as e:
            error_message = str(e)
            self.add_error(None, error_message)
            raise


class CreateForm(AccountManagementForm):

    def form_action(self, managementRequest, processingUser):
        return managementRequest.activate(
            comment=self.cleaned_data['comment'],
            processingUser=processingUser
        )

class ConnectForm(AccountManagementForm):
    comment = forms.CharField(
        required=False,
        widget=forms.Textarea,
        initial="Connected"
    )
    plan = forms.ModelChoiceField(
        queryset = SubscriptionPlan.objects.all(),
        required=True
    )

    def form_action(self, managementRequest, processingUser):
        return managementRequest.connect(
            comment=self.cleaned_data['comment'],
            processingUser=processingUser,
            plan = self.cleaned_data['plan']
        )

class CancelForm(AccountManagementForm):
    comment = forms.CharField(
        required=False,
        widget=forms.Textarea,
        initial="Canceled"
    )

    def form_action(self, managementRequest, processingUser):
        return managementRequest.cancel(
            comment=self.cleaned_data['comment'],
            processingUser=processingUser
        )
