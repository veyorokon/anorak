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
from .forms import *
from django.http import HttpResponseRedirect


@admin.register(ManagementRequest)
class ManagementRequestAdmin(admin.ModelAdmin):
    date_heirarchy = (
        'date_created',
    )
    list_display = (
        'id',
        'status',
        'requested_action',
        'requested_by',
        'processed_by',
        'subscription_account',
        'originator',
        'account_actions'
    )
    readonly_fields = (
        'requested_by',
        'status',
        'id',
        'originator',
        'subscription_account',
        'requested_action',
        'account_actions',
        'processed_by',
    )

    def process_action(self,request, management_request_id, action_form, action_title, template):
        managementRequest = self.get_object(request, management_request_id)
        subscriptionAccount = managementRequest.subscription_account

        if request.method != 'POST':
            form = action_form()
        else:
            form = action_form(request.POST)
            if form.is_valid():
                try:
                    processingUser = request.user
                    form.save(managementRequest, processingUser)
                except errors.Error as e:
                    pass
                return redirect('/api/admin/request/managementrequest/')

        context = self.admin_site.each_context(request)
        context['opts'] = self.model._meta
        context['form'] = form
        context['managementRequest'] = managementRequest
        context['subscriptionAccount'] = subscriptionAccount
        context['title'] = action_title

        return TemplateResponse(
            request,
            template,
            context,
        )

    def process_create(self, request, management_request_id, *args, **kwargs):
        return self.process_action(
            request=request,
            management_request_id=management_request_id,
            action_form=CreateForm,
            action_title='Create',
            template='account_activate.tpl'
        )

    def process_connect(self, request, management_request_id, *args, **kwargs):
        return self.process_action(
            request=request,
            management_request_id=management_request_id,
            action_form=ConnectForm,
            action_title='Connect',
            template='account_activate.tpl'
        )

    def process_cancel(self, request, management_request_id, *args, **kwargs):
        return self.process_action(
            request=request,
            management_request_id=management_request_id,
            action_form=CancelForm,
            action_title='Cancel',
            template='account_cancel.tpl'
        )

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                '<int:management_request_id>/create/',
                self.admin_site.admin_view(self.process_create),
                name='account-create',
            ),
            path(
                '<int:management_request_id>/connect/',
                self.admin_site.admin_view(self.process_connect),
                name='account-connect',
            ),
            path(
                '<int:management_request_id>/cancel/',
                self.admin_site.admin_view(self.process_cancel),
                name='account-cancel',
            ),
        ]
        return custom_urls + urls

    def account_actions(self, obj):
        if obj.status == ManagementRequestStatus.PROCESSING:
            if obj.requested_action == ManagementRequestAction.CREATE_ACCOUNT:
                return format_html(
                    '<a class="button" href="{}">Create</a>&nbsp;',
                    reverse('admin:account-create', args=[obj.pk]),
                )

            elif obj.requested_action == ManagementRequestAction.CONNECT_ACCOUNT:
                return format_html(
                    '<a class="button" href="{}">Connect</a>&nbsp;',
                    reverse('admin:account-connect', args=[obj.pk]),
                )

            elif obj.requested_action == ManagementRequestAction.CANCEL_ACCOUNT:
                return format_html(
                    '<a class="button" href="{}">Cancel</a>&nbsp;',
                    reverse('admin:account-cancel', args=[obj.pk]),
                )
        return None
    account_actions.short_description = 'Account Actions'
    account_actions.allow_tags = True
