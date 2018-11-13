"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 1.11.15.

For more information on this file, see
https://docs.djangoproject.com/en/1.11/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.11/ref/settings/
"""

import os
from . base import *

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.11/howto/deployment/checklist/
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'v(m)6f0+s3d$o4lk$lli&un$e1a@bu3oww^9=s=ms)+@df23*r'
FIELD_ENCRYPTION_KEY = 'g2z7GI3SaOnTNDCEZhy_46NWSzyUatriWt_ecPTjHNo='

DEBUG = True


ALLOWED_HOSTS =[
    '127.0.0.1',
    'localhost',
]


STRIPE_ACCOUNT_SID = 'sk_test_9Xz79VxZxWJbanvxDAWLYmoN'
STRIPE_SQUADUP_PRODUCT = 'prod_DwkQeS0ynwmGnR'


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'HOST': 'database',
        'PORT': 5432
    }
}

CORS_ORIGIN_ALLOW_ALL = True