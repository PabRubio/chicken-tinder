"""Defines URL patterns for profiles."""

from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import edit_profile, view_profile

app_name = 'profiles'
urlpatterns = [
    path('settings/', edit_profile, name='settings'),
    path('profile/', view_profile, name='profile'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
