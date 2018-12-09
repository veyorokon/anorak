import graphene 
from graphene_django.types import DjangoObjectType
from subscription_api.models import * 

class SquadType(DjangoObjectType):
    
    current_user_status = graphene.String()
    
    class Meta:
        model = Squad
        exclude_fields = ['owner', 'secret', 'date_created', 'date_modified', 'stripe_plan']
    
    def resolve_members(self, info):
        if info.context.user == self.owner:
            return self.members
        return None
        
    
    def resolve_current_user_status(self, info):
        try:
            membershipType = SquadMember.objects.get(
                squad=self.id, 
                user=info.context.user
            ).status
            
            memberRole = SquadMemberStatus.items()[membershipType][0]
            
            return memberRole.lower()
        except:
            return None

class SquadMemberType(DjangoObjectType):
    class Meta:
        model = SquadMember
