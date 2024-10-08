from django.urls import path
from . import views
from .views import test_view

urlpatterns = [
    path('', views.index, name='index'),  # This will serve the React frontend
    path('api/test/', test_view, name='test_view'),  # New test endpoint
]