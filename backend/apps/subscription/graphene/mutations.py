"""
Graphene (GraphQL) mutations for the subscription models
"""

##########################################################################
## Imports
##########################################################################

import graphene
from django.db.models import Q
from . types import _SubscriptionAccountType, _SubscriptionMemberType, _SubscriptionLoginType, _SubscriptionInviteType
from core.models import *
from subscription.models import SubscriptionService, SubscriptionAccount, SubscriptionPlan, SubscriptionMember, SubscriptionInvite
from subscription.enum import *
from graphql_jwt.decorators import login_required


##########################################################################
## Mutation for new CreateAccount
##########################################################################

class SubscriptionCreateMutation(graphene.Mutation):

    class Arguments:
        serviceKey = graphene.Int(required=True)
        planKey = graphene.Int(required=True)
        token = graphene.String(required=True)
        username = graphene.String(required=True)
        password = graphene.String(required=True)

    subscriptionAccount =  graphene.Field(_SubscriptionAccountType)

    @login_required
    def mutate(self, info, serviceKey, planKey, token, username, password, **kwargs):
        user = info.context.user
        service = SubscriptionService.objects.get(
            pk=serviceKey
        )
        plan = SubscriptionPlan.objects.get(
            pk = planKey,
            service = service,
        )
        account = SubscriptionAccount.objects.create(
            responsible_user = user,
            subscription_service = service,
            subscription_plan = plan,
            status_account = SubscriptionAccountStatus.ADDED,
            username = username,
            password = password
        )

        member = SubscriptionMember.objects.create(
            user = user,
            subscription_account = account
        )

        return SubscriptionCreateMutation(
            subscriptionAccount = account
        )

##########################################################################
## Mutation to delete membership and account
##########################################################################

class DeleteAccountMutation(graphene.Mutation):

    class Arguments:
        token = graphene.String(required=True)
        subscriptionAccountKey = graphene.Int(required=True)

    success =  graphene.Boolean()

    @login_required
    def mutate(self, info, token, subscriptionAccountKey, **kwargs):
        user = info.context.user
        account = SubscriptionAccount.objects.get(
            pk = subscriptionAccountKey,
        )
        if not user == account.responsible_user:
            try:
                member = SubscriptionMember.objects.get(
                    subscription_account = account,
                    user = user
                )
                member.delete()
            except:
                raise ValueError(
                    "You don't have an active membership."
                )
        else:
            try:
                account = SubscriptionAccount.objects.get(
                    pk = subscriptionAccountKey,
                    responsible_user = user
                )
            except:
                raise ValueError(
                    "The subscription account could not be found."
                )
            account.delete()
        return DeleteAccountMutation(
            success = True
        )


##########################################################################
## Mutation to update account login
##########################################################################

class UpdateAccountMutation(graphene.Mutation):

    class Arguments:
        token = graphene.String(required=True)
        subscriptionAccountKey = graphene.Int(required=True)
        password = graphene.String(required=True)

    subscriptionAccount =  graphene.Field(_SubscriptionLoginType)

    @login_required
    def mutate(self, info, token, subscriptionAccountKey, password, **kwargs):
        user = info.context.user
        try:
            account = SubscriptionAccount.objects.get(
                pk = subscriptionAccountKey,
                responsible_user = user
            )
        except:
            raise ValueError(
                "The subscription account could not be found."
            )
        account.password = password
        account.save()
        return UpdateAccountMutation(
            subscriptionAccount = account
        )


##########################################################################
## Mutation to create subscription invite
##########################################################################

class CreateInviteMutation(graphene.Mutation):

    class Arguments:
        token = graphene.String(required=True)
        subscriptionAccountKey = graphene.Int(required=True)
        recipientEmail = graphene.String(required=True)

    subscriptionInvite =  graphene.Field(_SubscriptionInviteType)

    @login_required
    def mutate(self, info, token, subscriptionAccountKey, recipientEmail, **kwargs):
        user = info.context.user
        if recipientEmail == user.email:
            raise ValueError(
                "You can't invite yourself."
            )
        try:
            account = SubscriptionAccount.objects.get(
                pk = subscriptionAccountKey,
                responsible_user = user
            )
        except:
            raise ValueError(
                "The subscription account could not be found."
            )

        try:
            recipient = User.objects.get(email=recipientEmail)
        except:
            recipient = None

        invite = SubscriptionInvite.objects.create(
            sender = user,
            recipient = recipient,
            recipient_email = recipientEmail,
            subscription_account = account
        )

        return CreateInviteMutation(
            subscriptionInvite = invite
        )


##########################################################################
## Mutation to delete invite
##########################################################################

class DeleteInviteMutation(graphene.Mutation):

    class Arguments:
        token = graphene.String(required=True)
        subscriptionInviteKey = graphene.Int(required=True)

    success =  graphene.Boolean()

    @login_required
    def mutate(self, info, token, subscriptionInviteKey, **kwargs):
        user = info.context.user
        try:
            invite = SubscriptionInvite.objects.filter(
                Q(sender=user) | Q(recipient_email=user.email)
            ).get(pk = subscriptionInviteKey)
            invite.delete()
        except:
            return DeleteInviteMutation(
                success = False
            )
        return DeleteInviteMutation(
            success = True
        )

##########################################################################
## Mutation to accept invite
##########################################################################

class AcceptInviteMutation(graphene.Mutation):

    class Arguments:
        token = graphene.String(required=True)
        subscriptionInviteKey = graphene.Int(required=True)

    success =  graphene.Boolean()

    @login_required
    def mutate(self, info, token, subscriptionInviteKey, **kwargs):
        user = info.context.user
        try:
            invite = SubscriptionInvite.objects.get(
                pk = subscriptionInviteKey,
                recipient_email=user.email
            )

            member = SubscriptionMember.objects.create(
                user = user,
                subscription_account = invite.subscription_account,
                status_membership = MembershipStatus.ACTIVE
            )
            invite.delete()
        except:
            return AcceptInviteMutation(
                success = False
            )
        return AcceptInviteMutation(
            success = True
        )

class Mutations(graphene.ObjectType):
    subscription_create_account = SubscriptionCreateMutation.Field(
        description = "Adds a new, unmanaged subscription account and no management request is generated."
    )

    subscription_delete_account = DeleteAccountMutation.Field(
        description = "Delete a subscription account."
    )

    subscription_update_account = UpdateAccountMutation.Field(
        description = "Update subscription account."
    )

    subscription_invite_account = CreateInviteMutation.Field(
        description = "Invites a user by email address."
    )

    subscription_invite_delete = DeleteInviteMutation.Field(
        description = "Deletes an invite."
    )

    subscription_invite_accept = AcceptInviteMutation.Field(
        description = "Accept an invite."
    )
