"""Integrate with admin module."""

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from django.utils.translation import ugettext_lazy as _

from .models import *


@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    """Define admin model for custom User model with no email field."""

    fieldsets = (
        (None, {'fields': ('email', 'phone_number', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'facebook_id',)}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions', 'is_member', 'is_verified')}),
        (_('Important dates'), {'fields': ('last_login',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )
    list_display = ('email','first_name', 'last_name', 'is_staff', 'is_member', 'is_verified')
    search_fields = ('email', 'first_name', 'last_name', 'is_member')
    ordering = ('email',)
    readonly_fields=('facebook_id','is_superuser','is_staff','user_permissions')

@admin.register(EmailVerification)
class EmailVerificationAdmin(admin.ModelAdmin):
    """Define admin model for SubscriptionPlan."""
    list_display = (
        'id',
        'user',
        'date_expires'
    )
    readonly_fields = (
        'code',
    )
