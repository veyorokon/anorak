from . models import User
from django.test import TestCase
from django.conf import settings

import stripe
stripe.api_key = settings.STRIPE_ACCOUNT_SID

class UserCreationTests(TestCase):
    
    def test_regular_user_creation(self):
        u = User(
            email = 'test@squadup.xyz',
            first_name = 'John',
            last_name = 'Doe',
            password = '12345678910'
        )
        u.save()        
        #print('Session Token: '+str(u.session_token))
        print('Billing Address: '+str(u.address_billing.__dict__))
        print('Created Stripe Customer ID: '+str(u.stripe_customer.stripe_customer_id))
        cu = stripe.Customer.retrieve(u.stripe_customer.stripe_customer_id)
        print('Destroying Stripe Customer ID: '+str(u.stripe_customer.stripe_customer_id))
        cu.delete()
        