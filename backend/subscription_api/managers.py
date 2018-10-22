from django.db import models
from django.apps import apps
from django.conf import settings

import stripe
stripe.api_key = settings.STRIPE_ACCOUNT_SID

class SquadManager(models.Manager):
    
    def create_squad(self, owner, cost_price, maximum_size, service):
        StripePlan = apps.get_model('subscription_api', 'StripePlan')
        squad = self.model(
            owner =user,
            maximum_size=maximum_size, 
            service=service
        )
        print(squad.id)
        
    def create_stripe_plan(self, service, cost_price):
        stripe.Plan.create(
            name=service,
            amount=cost_price * 100,
            interval="month",
            product={
                "id": settings.STRIPE_SQUADUP_PRODUCT
            },
            currency="usd",
        )