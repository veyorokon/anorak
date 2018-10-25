"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from . import views

urlpatterns = [
    path(
        'dashboard/stripe_plan_detail/', 
        views.StripePlanDetailAPI.as_view()
    ),
    path(
        'dashboard/squad_detail/', 
        views.SquadDetailAPI.as_view()
    ),
    path(
        'dashboard/squad_member_details/', 
        views.SquadMemberDetailAPI.as_view()
    ),
    path(
        'dashboard/create_squad/', 
        views.CreateSquadAPI.as_view()
    ),
    path(
        'dashboard/user_dashboard/', 
        views.DashboardAPI.as_view()
    ),
    ,
    path(
        'dashboard/create_web_subscriber/', 
        views.CreateWebSubscriberAPI.as_view()
    ),
]
