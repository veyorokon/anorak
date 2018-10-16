from django.test import TestCase
from . models import User

class UserCreationTests(TestCase):
    
    def test_regular_user_creation(self):
        u = User(
            email = 'test@squadup.xyz',
            first_name = 'John',
            last_name = 'Doe',
            password = '12345678910'
        )
        u.save()        
        print(u.session_token)
        print(u.address_billing.__dict__)
        print(u.stripe_customer.stripe_customer_id)