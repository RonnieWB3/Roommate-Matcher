from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    profile_pic_url = models.URLField(max_length=200, blank=True, null=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    bio = models.TextField(blank=True, null=True)
    notification_history = models.JSONField(blank=True, null=True)  # To store notifications as JSON data

    def login(self):
        # Define login logic here
        pass

    def register(self):
        # Define registration logic here
        pass

    def update_profile(self):
        # Define profile update logic here
        pass

    def reset_password(self):
        # Define reset password logic here
        pass

    def email_verification(self):
        # Define email verification logic here
        pass