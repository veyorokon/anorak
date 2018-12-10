import graphene 
from graphene_django.types import DjangoObjectType
from subscription_api.models import * 

class SquadType(DjangoObjectType):
    
    current_user_status = graphene.String()
    owner = graphene.String()
    
    class Meta:
        model = Squad
        exclude_fields = ['date_created', 'date_modified', 'stripe_plan']
    
    def resolve_members(self, info):
        if info.context.user == self.owner:
            return self.members
        return None
    
    def resolve_owner(self, info):
        return '{0} {1}'.format(self.owner.first_name, self.owner.last_name)
        
    def resolve_secret(self, info):
        try:
            membership = SquadMember.objects.get(
                squad=self.id, 
                user=info.context.user
            )
            if(membership.status >= SquadMemberStatus.SUBSCRIBED):
                return self.secret
        except:
            pass
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
    status = graphene.String()
    
    class Meta:
        model = SquadMember
        
    def resolve_status(self, info):
        try:            
            memberRole = SquadMemberStatus.items()[self.status][0]
            return memberRole.lower()
        except:
            return None
