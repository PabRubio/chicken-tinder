"""Defines URL patterns for users."""

from django.urls import path, include

from . import views

app_name = 'users'
urlpatterns = [
    # Home page.
    path('', views.index, name='index'),
    # Include default auth urls.
    path('', include('django.contrib.auth.urls')),
    # Registration page.
    path('signup/', views.register, name='signup'),
]
