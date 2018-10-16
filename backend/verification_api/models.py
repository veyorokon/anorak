from django.db import models
from django.utils.crypto import get_random_string

# Create your models here.
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