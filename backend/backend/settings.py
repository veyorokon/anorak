"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 1.11.15.

For more information on this file, see
https://docs.djangoproject.com/en/1.11/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.11/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.11/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'v(m)6f0+s3d$o4lk$lli&un$e1a@bu3oww^9=s=ms)+@df23*r'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

#ALLOWED_HOSTS = ['squadup.xyz', 'www.squadup.xyz', 'nginx', '127.0.0.1', 'django-env.k4nxphhzk2.us-west-1.elasticbeanstalk.com']
ALLOWED_HOSTS=['127.0.0.1']


#Stripe key
STRIPE_ACCOUNT_SID = 'sk_test_9Xz79VxZxWJbanvxDAWLYmoN'


#Phoone verification - Twilio
TWILIO_ACCOUNT_SID = 'ACaf89a225145d292dfb5ad9ec6e8ab10e'
TWILIO_AUTH_TOKEN = 'de38eed12958a9d20b3e0a058ee7b5ef'
TWILIO_NUMBER = '+18596948148'
TWILIO_DEFAULT_CALLERID = 'SquadUp'



# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'core',
    'subscription_api',
    'verification_api'
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
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
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


# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'squadupDev',
    }
}

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql_psycopg2',
#         'NAME': 'squad_admin',
#         'USER': 'squad_admin',
#         'PASSWORD': 'vE232050$',
#         'HOST': 'squadupdatabase.cl30dofcfhys.us-west-1.rds.amazonaws.com',
#         'PORT': '5432',
#     }
# }


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
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    # ORIGINAL: 'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    # FOR DEVELOPMENT MODE ONLY >>>
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    )
}
#CSRF_COOKIE_SECURE = True
#SESSION_COOKIE_SECURE = True
#SECURE_PROXY_SSL_HEADER = True

# Internationalization
# https://docs.djangoproject.com/en/1.11/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'US/Pacific'
USE_I18N = True

USE_L10N = True

USE_TZ = True

STATIC_URL = '/static/'

#STATICFILES_DIRS = [
#    #os.path.join(BASE_DIR, 'static'),
#    os.path.join(BASE_DIR, 'static/'),
#    ]

STATIC_ROOT = os.path.join(BASE_DIR, '/static/')
#CORS_ORIGIN_ALLOW_ALL = True
#STATIC_ROOT = 'static'
