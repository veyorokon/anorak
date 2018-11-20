import graphene 
from . types import *
from graphql_jwt.decorators import login_required

class TriggerEvent(graphene.Mutation):
    
    class Arguments:
        event = graphene.String(required=True)
        page = graphene.String(required=True)
        module = graphene.String(required=True)
    
    trigger =  graphene.Field(TriggerType)
        
    def mutate(self, info, event, page, module):
        trigger = Trigger(
            user=None,
            event = event,
            page = page,
            module = module
        )
        
        try:
            trigger.save()
            return TriggerEvent(trigger=trigger)
        except:
           raise ValueError("Could not trigger event")        


class TriggerUserEvent(TriggerEvent):
    
    class Arguments:
        token= graphene.String()
        event = graphene.String(required=True)
        page = graphene.String(required=True)
        module = graphene.String(required=True)
    
    trigger =  graphene.Field(TriggerType)
    
    @login_required
    def mutate(self, info, event, page, module, token):
        trigger = Trigger(
            user=info.context.user,
            event = event,
            page = page,
            module = module
        )
        
        try:
            trigger.save()
            return TriggerUserEvent(trigger=trigger)
        except:
           raise ValueError("Could not trigger event")
        

class Mutations(graphene.ObjectType):
    trigger_event = TriggerEvent.Field()
    trigger_user_event = TriggerUserEvent.Field()

