from . models import *
from django.test import TestCase
from django.conf import settings

import stripe
stripe.api_key = settings.STRIPE_ACCOUNT_SID

from django.contrib.auth import get_user_model
from graphql_jwt.testcases import JSONWebTokenTestCase


class UsersTests(JSONWebTokenTestCase):

    def setUp(self):
        self.user = get_user_model().objects.create(email='test@test.com')
        self.client.authenticate(self.user)

    def test_get_user(self):
        query = '''
        query GetUser($email: String!) {
          user(email: $email) {
            id
          }
        }'''

        variables = {
          'email': self.user.email,
        }
        cu = StripeCustomer.objects.get(user=self.user)
        print("CUSTOMER: "+cu.stripe_customer_id)
        self.client.execute(query, variables=variables)
        cu.delete_customer()
    