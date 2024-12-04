# project_root/urls.py

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls), # This is the URL configuration of the Django admin site.
    path('api/', include('user_api.urls')), # This is the URL configuration of the user_api app.
]

if settings.DEBUG: # This is the URL configuration of the Django project when DEBUG is True.
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) # This is the URL configuration of the media files when DEBUG is True.
