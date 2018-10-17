from random import randint
from core.models import User
from django.db import models
from twilio.rest import Client
from django.conf import settings
from django.core.validators import RegexValidator
from django.utils.crypto import get_random_string


class EmailVerificationCode(models.Model):
    code = models.CharField(max_length=6, null=True, blank=True)
    email = models.EmailField(unique=True)
    verified = models.BooleanField(default=False)
    created = models.DateField(auto_now=True, blank=True)
    validation_token = models.CharField(max_length=32, null=True, unique=True, blank=True)
    
    def email_verification_code(self):
        return True
    
    def generate_new_code(self):
        '''
        Generates a new verification code to be emailed to the user
        '''
        n = 6
        num = ''.join(["%s" % randint(0, 9) for num in range(0, n)])
        self.code = num
        self.verified = False
        self.validation_token = get_random_string(length=32)
        self.save()
        return num
        
    def validate(self):
        '''
        Sets the email verified to True
        '''
        self.verified = True
        self.save()
        
    def __str__(self):
        return self.email, self.code # Extends the User model
    
        
class PhoneVerificationCode(models.Model):
    code = models.CharField(max_length=6, null=True, blank=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, 
        related_name='phone_verification_code')
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', 
        message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    phone_number = models.CharField(validators=[phone_regex], max_length=17, 
        blank=True, null=True) # validators should be a list
    verified = models.BooleanField(default=False)
    created = models.DateField(auto_now=True, blank=True)
    validation_token = models.CharField(max_length=32, null=True, unique=True, blank=True)
    
    def text_verification_code(self):
        '''
        Texts the verification code to the user
        '''
        account_sid = settings.TWILIO_ACCOUNT_SID
        auth_token = settings.TWILIO_AUTH_TOKEN
        client = Client(account_sid, auth_token)
        message = client.messages \
                        .create(
                             body=str(self.code)+ " Is your SquadUp confirmation code.",
                             from_= settings.TWILIO_NUMBER,
                             to=self.phone_number
                         )

        return True
    
    def generate_new_code(self):
        '''
        Generates a new verification code
        '''
        n = 6
        num = ''.join(["%s" % randint(0, 9) for num in range(0, n)])
        self.code = num
        self.verified = False
        self.validation_token = get_random_string(length=32)
        self.save()
        return num
        
    def validate_phone_number(self):
        '''
        Sets the phone verified to True
        '''
        self.verified = True
        self.user = User.objects.get_or_create(phone_number = self.phone_number)[0]
        self.save()
        return self.user
        
    def __str__(self):
        return self.phoneNumber, self.code # Extends the User model