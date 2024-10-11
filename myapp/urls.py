from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.index, name='index'),  # Serve the index page (if needed by Django)
    re_path(r'^.*$', views.index),  # Catch-all for React Router
    path('api/login/', views.login_view, name='login'),  # API for login
]
