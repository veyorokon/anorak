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

DEBUG = False


#ALLOWED_HOSTS+=[]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': environ_setting('DB_NAME'),
        'USER':  environ_setting('DB_USER'),
        'HOST':  environ_setting('DB_HOST'),
	'PASSWORD': environ_setting('DB_PASS'),
        'PORT':  environ_setting('DB_PORT')
    }
}

####            Cache settings
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": environ_setting("REDIS_URL")+"/1",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
            "PASSWORD":environ_setting("REDIS_PASSWORD")
        },
    }
}

GRAPHQL_JWT['JWT_VERIFY_EXPIRATION'] = False


CORS_ORIGIN_ALLOW_ALL = False
