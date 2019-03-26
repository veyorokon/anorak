"""
Custom admin for the request models
"""

##########################################################################
## Imports
##########################################################################

from __future__ import unicode_literals
from django.template.response import TemplateResponse

from . import errors
from django.contrib import admin
from django.apps import apps
from . models import *
from django.utils.html import format_html
from django.urls import reverse
from django.shortcuts import redirect
from django.urls import path
from .forms import ActivateForm
from django.http import HttpResponseRedirect

    
@admin.register(ManagementRequest)
class ManagementRequestAdmin(admin.ModelAdmin):
    date_heirarchy = (
        'date_created',
    )
    list_display = (
        'id',
        'subscription_account',
        'originator',
        'status',
        'requested_action', 
        'account_actions'
    )
    readonly_fields = (
        'id',
        'account_actions', 
    )
    
    def process_action(self,request, management_request_id, action_form, action_title):
        managementRequest = self.get_object(request, management_request_id)
        subscriptionAccount = managementRequest.subscription_account
        
        if request.method != 'POST':
            form = action_form()
        else:
            form = action_form(request.POST)
            if form.is_valid():
                try:
                    form.save(managementRequest)
                except errors.Error as e:
                    pass
                return redirect('/api/admin/request/managementrequest/')
                    
        context = self.admin_site.each_context(request)
        context['opts'] = self.model._meta
        context['form'] = form
        context['managementRequest'] = managementRequest
        context['subscriptionAaccount'] = subscriptionAccount
        context['title'] = action_title
        
        return TemplateResponse(
            request,
            'account_activate.tpl',
            context,
        )
    
    def process_activate(self, request, management_request_id, *args, **kwargs):
        return self.process_action(
            request=request,
            management_request_id=management_request_id,
            action_form=ActivateForm,
            action_title='Activate',
        )
        
    
    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                '<int:management_request_id>/activate/',
                self.admin_site.admin_view(self.process_activate),
                name='account-activate',
            ),
        ]
        return custom_urls + urls
        
    def account_actions(self, obj):
        if obj.status == ManagementRequestStatus.PROCESSING:
            if obj.requested_action == ManagementRequestAction.CREATE_ACCOUNT:
                return format_html(
                    '<a class="button" href="{}">Create</a>&nbsp;',
                    reverse('admin:account-activate', args=[obj.pk]),
                )
                
            elif obj.requested_action == ManagementRequestAction.CONNECT_ACCOUNT:
                return format_html(
                    '<a class="button" href="{}">Connect</a>&nbsp;',
                    reverse('admin:account-activate', args=[obj.pk]),
                )
        return None
    account_actions.short_description = 'Account Actions'
    account_actions.allow_tags = True
