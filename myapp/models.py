from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

class User(AbstractUser):
    profile_pic_url = models.URLField(max_length=200, blank=True, null=True) # To store profile picture URL
    bio = models.TextField(blank=True, null=True) # To store user bio
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

class PreferenceSheet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE) # Link to the user
    smoking_preference = models.CharField(max_length=15) # Smoking preference
    neatness = models.IntegerField() # Neatness level
    gender_preference = models.CharField(max_length=6) # Gender preference
    pet_preference = models.CharField(max_length=50) # Pet preference
    budget_range = models.IntegerField() # Budget range

    def update_preference(self):
        # Define logic to update preferences here
        pass

    def __str__(self):
        return f"{self.user}'s Preference Sheet"
    
class Post(models.Model):
    title = models.CharField(max_length=255)  # To store post title
    description = models.TextField()  # Detailed description of the post
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Price for the room
    location = models.CharField(max_length=255)  # Location of the room being posted
    date_posted = models.DateTimeField(auto_now_add=True)  # Auto set the date when the post was created
    last_updated = models.DateTimeField(auto_now=True)  # Auto set the date when the post was last updated
    posted_by = models.ForeignKey('User', on_delete=models.CASCADE)  # The user who created the post
    available_from = models.DateField()  # When the room is available from
    preferences = models.ForeignKey('PreferenceSheet', on_delete=models.SET_NULL, null=True, blank=True)  # Optional link to preference sheet
    status = models.CharField(max_length=10, choices=[('Active', 'Active'), ('Inactive', 'Inactive')], default='Active')  # Post status

    def __str__(self):
        return self.title

class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sent_messages") # The user who sent the message
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name="received_messages") # The user who received the message
    content = models.TextField() # The message content
    timestamp = models.DateTimeField(default=timezone.now) # The timestamp when the message was sent
    is_read = models.BooleanField(default=False) # Whether the message has been read

    def delete_message(self):
        """ Deletes the message instance. """
        self.delete() # Delete the message instance

    def read_message(self):
        """ Marks the message as read. """
        self.is_read = True # Set is_read to True
        self.save() # Save the message instance

    @classmethod
    def send_message(cls, sender, receiver, content):
        """ Sends a new message from sender to receiver. """
        message = cls(sender=sender, receiver=receiver, content=content) # Create a new message instance
        message.save() # Save the message instance
        return message # Return the message instance

    def __str__(self):
        return f"Message from {self.sender} to {self.receiver} at {self.timestamp}" 

