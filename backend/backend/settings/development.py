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

DEBUG = True


ALLOWED_HOSTS+=[
    '127.0.0.1',
    'localhost',
]


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': environ_setting('DB_NAME'),
        'USER':  environ_setting('DB_USER'),
        'HOST':  environ_setting('DB_HOST'),
        'PORT':  environ_setting('DB_PORT')
    }
}

NOTEBOOK_ARGUMENTS = [
    '--ip', '0.0.0.0', 
    '--allow-root',
    '--no-browser', 
]

GRAPHQL_JWT['JWT_VERIFY_EXPIRATION'] = False


CORS_ORIGIN_ALLOW_ALL = True
