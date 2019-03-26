"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 1.11.15.

For more information on this file, see
https://docs.djangoproject.com/en/1.11/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.11/ref/settings/
"""

import os
import sys
# from celery.schedules import crontab

##########################################################################
## Helper function for environmental settings
##########################################################################

def environ_setting(name, default=None):
    """
    Fetch setting from the environment- if not found, then this setting is
    ImproperlyConfigured.
    """
    if name not in os.environ and default is None:
        from django.core.exceptions import ImproperlyConfigured
        raise ImproperlyConfigured(
            "The {0} ENVVAR is not set.".format(name)
        )

    return os.environ.get(name, default)


# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.join(BASE_DIR, 'apps'))

ALLOWED_HOSTS = [
    'squadup.xyz', 
    'www.squadup.xyz', 
    'www.ianorak.com', 
    'ianorak.com'
]

#Facebook
FACEBOOK_CLIENT_ID = environ_setting('FACEBOOK_CLIENT_ID')
FACEBOOK_CLIENT_SECRET = environ_setting('FACEBOOK_CLIENT_SECRET')

SECRET_KEY = environ_setting("SECRET_KEY")
FIELD_ENCRYPTION_KEY = environ_setting("FIELD_ENCRYPTION_KEY")

STRIPE_ACCOUNT_SID = environ_setting("STRIPE_ACCOUNT_SID")
STRIPE_ANORAK_PRODUCT = environ_setting("STRIPE_ANORAK_PRODUCT")
STRIPE_ANORAK_PLAN = environ_setting("STRIPE_ANORAK_PLAN")

# Application definition
INSTALLED_APPS = [
    'django_feedparser',
    'jet.dashboard',
    'jet',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    
    'graphene_django',
    'django_extensions',
    'encrypted_model_fields',
    'mail_templated',
    "djstripe",
    
    'core',
    'subscription',
    'request',
]

TAX_JAR_KEY = environ_setting("TAX_JAR_KEY")

####            Cache settings
# 
# CELERY_BROKER_URL = "redis://:"+ environ_setting("REDIS_PASSWORD")+ "@"+environ_setting("REDIS_HOST") + ":" + environ_setting("REDIS_PORT")

# CACHES = {
#     "default": {
#         "BACKEND": "django_redis.cache.RedisCache",
#         "LOCATION": CELERY_BROKER_URL+"/1",
#         "OPTIONS": {
#             "CLIENT_CLASS": "django_redis.client.DefaultClient",
#         },
#     }
# }


SESSION_ENGINE = "django.contrib.sessions.backends.cache"

# # Other Celery settings
# CELERY_RESULT_BACKEND = CELERY_BROKER_URL
# CELERY_ACCEPT_CONTENT = ['application/json']
# CELERY_RESULT_SERIALIZER = 'json'
# CELERY_TASK_SERIALIZER = 'json'
# 
# CELERY_BEAT_SCHEDULE = {
#     'task-number-one': {
#         'task': 'accounting.tasks.sync_stripe_invoices',
#         'schedule': crontab(minute='55', hour='23'),
#     },
# }

# GSuite Gmail server
EMAIL_USE_TLS = True
EMAIL_HOST = environ_setting("EMAIL_HOST")
EMAIL_PORT = 587
EMAIL_HOST_USER = environ_setting("EMAIL_HOST_USER") 
EMAIL_HOST_PASSWORD = environ_setting("EMAIL_HOST_PASSWORD")

GRAPHENE = {
    'SCHEMA': 'backend.schema.schema',
    'MIDDLEWARE': [
        'graphql_jwt.middleware.JSONWebTokenMiddleware',
    ],
}

JWT_AUTH = {
    'JWT_ARGUMENT_NAME': 'token'
}

GRAPHQL_JWT = {
    'JWT_ALLOW_ARGUMENT': True,
}

AUTHENTICATION_BACKENDS = [
    'graphql_jwt.backends.JSONWebTokenBackend',
    'django.contrib.auth.backends.ModelBackend',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.BrokenLinkEmailsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates/'),],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'
AUTH_USER_MODEL = 'core.User'

STRIPE_TEST_PUBLIC_KEY = environ_setting("STRIPE_TEST_PUBLIC_KEY")
STRIPE_TEST_SECRET_KEY = environ_setting("STRIPE_ACCOUNT_SID")
STRIPE_LIVE_MODE = False  # Change to True in production
DJSTRIPE_WEBHOOK_SECRET = environ_setting("DJSTRIPE_WEBHOOK_SECRET")
# Get it from the section in the Stripe dashboard where you added the webhook endpoint

# Password validation
# https://docs.djangoproject.com/en/1.11/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
}


CORS_ORIGIN_WHITELIST = (
    'squadup.xyz',
    'www.squadup.xyz',
    'www.ianorak.com', 
    'ianorak.com'
)

# Internationalization
# https://docs.djangoproject.com/en/1.11/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'
USE_I18N = True

USE_L10N = True

USE_TZ = True

STATICFILES_DIRS = (
     os.path.join(BASE_DIR, 'static/'),
)
#STATIC_URL = os.environ.get('STATIC_URL', '/static/')
STATIC_URL = '/static_files/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static_files/')
