import os
from pathlib import Path
from datetime import timedelta
import dj_database_url  # <--- Added for Render Database

"""
Django settings for config project.
Updated for Vercel & Render Production.
"""

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-je0lq1l+_tp9%p+8@#=lq!l=!yumds!tegn@_b!5m5ifb3412s')

# SECURITY WARNING: don't run with debug turned on in production!
# We keep it True for now so you can see errors in the logs if they happen.
DEBUG = True 

# Allow all hosts (Crucial for Render)
ALLOWED_HOSTS = ["*"]


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-Party Apps
    'graphene_django',
    'rest_framework',
    'rest_framework_simplejwt', 
    'corsheaders',  # <--- Required for Vercel

    # Local Apps
    'core',
    'leave',
    'payroll',
    'performance',
    'audit',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',            # <--- TOP: CORS (Must be first)
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',       # <--- Serve static files on Render
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

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

WSGI_APPLICATION = 'config.wsgi.application'


# --- DATABASE CONFIGURATION ---
# Render automatically sets DATABASE_URL. We use that if available.
DATABASES = {
    'default': dj_database_url.config(
        default='postgres://nexus_user:admin123@db:5432/nexus_hr_db',
        conn_max_age=600
    )
}


AUTH_USER_MODEL = 'core.User'


# Password validation
AUTH_PASSWORD_VALIDATORS = [
    { 'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator', },
    { 'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator', },
    { 'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator', },
    { 'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator', },
]


# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True


# --- STATIC FILES (CSS, JS, Images) ---
# Required for Render to display the Admin Panel correctly
STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'


# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# --- CORS & CSRF SETTINGS (The Fix for Vercel) ---
CORS_ALLOW_ALL_ORIGINS = True 
CORS_ALLOW_CREDENTIALS = True

# We trust Vercel and Render to talk to this backend
CSRF_TRUSTED_ORIGINS = [
    "https://nexus-hr-saas.onrender.com",
    "https://nexus-hr-saas.vercel.app",
]

# --- REST FRAMEWORK SETTINGS ---
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        # Removed 'SessionAuthentication' to prevent CSRF errors on Vercel login
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
}

# --- JWT SETTINGS ---
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
}

# --- GRAPHQL SETTINGS ---
GRAPHENE = {
    "SCHEMA": "config.schema.schema",
    "MIDDLEWARE": [
        "graphql_jwt.middleware.JSONWebTokenMiddleware",
    ],
}

AUTHENTICATION_BACKENDS = [
    "graphql_jwt.backends.JSONWebTokenBackend",
    "django.contrib.auth.backends.ModelBackend",
]