import graphene 
from . types import *
from core.models import * 
from request.models import ManagementRequestAction, ManagementRequest
from graphql_jwt.decorators import login_required

# class RequestCancellationMutation(graphene.Mutation):
# 
#     class Arguments:
#         token = graphene.String(required=True)
#         memberKey = graphene.Int(required=True)
#         accountKey = graphene.Int(required=True)
# 
#     managementRequest =  graphene.Field(ManagementRequestType)
# 
#     @login_required
#     def mutate(self, info, token, memberKey, accountKey, **kwargs):
#         try:
#             account = SubscriptionAccount.objects.get(
#                 responsible_user = info.context.user,
#                 id = accountKey
#             )
#             account.status_account = SubscriptionAccountStatus.PENDING
#             account.save()
#         except:
#             raise ValueError("Subscription account was not found.")
#         try:
#             member = SubscriptionMember.objects.get(
#                 user = info.context.user,
#                 subscription_account = account,
#             )
#             member.status_membership = MembershipStatus.PENDING_UPDATING
#             member.save()
#         except:
#             raise ValueError("Subscription member was not found.")
#         try:
#             request = ManagementRequest.objects.create(
#                 subscription_account = account,
#                 subscription_member = member,
#                 requested_action = ManagementRequestAction.CANCEL_ACCOUNT
#             )
#         except:
#             raise ValueError("Request could not be created.")
# 
#         return RequestCancellationMutation(
#             managementRequest = request
#         )
        
class Mutations(graphene.ObjectType):
    pass
    # request_cancellation = RequestCancellationMutation.Field(description = "Creates a management request to cancel the subscription account.")
    # 
