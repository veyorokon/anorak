import graphene 
from . types import *
from core.models import * 
from subscription.models import SubscriptionAccount, SubscriptionService, SubscriptionPricingPlan, SubscriptionMember, SubscriptionAccountStatus, MembershipStatus
from accounting.email import *
from accounting.models import Invoice
from graphql_jwt.decorators import login_required

class SubscriptionAccountMutation(graphene.Mutation):
    
    class Arguments:
        serviceKey = graphene.Int(required=True)
        planKey = graphene.Int(required=True)
        token = graphene.String(required=True)
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        isConnectedAccount = graphene.Boolean()
    
    subscriptionAccount =  graphene.Field(SubscriptionAccountType)
    
    @login_required
    def mutate(self, info, serviceKey, planKey, token, username, password, isConnectedAccount, **kwargs):
        if not info.context.user.stripe_customer.has_card_on_file:
            raise ValueError("Subscription could not be created. No active card was on file.")    
                
        service = SubscriptionService.objects.get(
            pk=serviceKey
        )

        if isConnectedAccount:   
            account = SubscriptionAccount.objects.create(
                responsible_user = info.context.user,
                service = service,
                is_connected_account = isConnectedAccount,
                status_account = SubscriptionAccountStatus.PENDING_CONNECT
            )
        else:
            price_plan = SubscriptionPricingPlan.objects.get(
                pk = planKey,
                service = service,
            )
            account = SubscriptionAccount.objects.create(
                responsible_user = info.context.user,
                service = service,
                price_plan = price_plan,
                is_connected_account = isConnectedAccount,
                status_account = SubscriptionAccountStatus.PENDING_CREATE
            )
            
        account.username = info.context.user.email
        account.password = password
        account.save()
        return SubscriptionAccountMutation(
            subscriptionAccount = account
        )
        
class SubscriptionAccountConnectConfirmMutation(graphene.Mutation):
    
    class Arguments:
        token = graphene.String(required=True)
        subscriptionAccountKey = graphene.Int(required=True)
    
    subscriptionAccount =  graphene.Field(SubscriptionAccountType)
    
    @login_required
    def mutate(self, info, token, subscriptionAccountKey, **kwargs):
        user =  info.context.user
        if not user.stripe_customer.has_card_on_file:
            raise ValueError("Subscription could not be created. No active card was on file.")        
            
        account = SubscriptionAccount.objects.get_or_create(
            pk = subscriptionAccountKey
        )[0]
        account.connect()
        account.save()
        membership = SubscriptionMember.objects.get(
            user = user,
            subscription_account = account
        )
        membership.add_to_stripe_subscription()
        membership.status_membership = MembershipStatus.CONNECTED
        membership.save()
        
        invoice = Invoice.objects.filter(user=user).order_by('-id')[0]
        invoice.save()
        email_receipt(membership, invoice)
        return SubscriptionAccountConnectConfirmMutation(
            subscriptionAccount = account
        )

class Mutations(graphene.ObjectType):
    subscription_account = SubscriptionAccountMutation.Field(description = "Creates a new subscription account. The server will automatically create membership and a management request.")
    
    confirm_connected_account = SubscriptionAccountConnectConfirmMutation.Field(description = "Confirms a previously connected account.")
    
