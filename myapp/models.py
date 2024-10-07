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
    smoking_preference = models.CharField(max_length=15, default="No Preference") # Smoking preference
    neatness = models.IntegerField() # Neatness level
    gender_preference = models.CharField(max_length=6, default="Any") # Gender preference
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
    number_rooms = models.IntegerField(default=1)  # Number of rooms available
    preferences = models.ForeignKey('PreferenceSheet', on_delete=models.SET_NULL, null=True, blank=True)  # Optional link to preference sheet
    status = models.CharField(max_length=10, choices=[('Active', 'Active'), ('Inactive', 'Inactive')], default='Active')  # Post status
    available_start_date = models.DateField()  # When the room is available from

    def is_valid_post(self):
        """ Check if the post is valid based on custom rules. """
        # Example validation: Ensure price is above 0 and post is active
        if self.price <= 0:
            return False  # Invalid because price must be greater than 0
        if self.status != 'Active':
            return False  # Invalid if post is not active
        if self.available_start_date < timezone.now().date():
            return False  # Invalid if available_from date is in the past
        return True  # Post is valid if all conditions are met
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

class Match(models.Model):
    matchid = models.AutoField(primary_key=True)  # Primary Key for the match
    userid = models.ForeignKey(User, on_delete=models.CASCADE, related_name='matches')  # User who is matching
    maybe_roommateid = models.ForeignKey(User, on_delete=models.CASCADE, related_name='potential_matches')  # Potential roommate
    compatability_score = models.FloatField()  # Compatibility score between users
    match_date = models.DateField(default=timezone.now)  # Date of the match

    def calculate_match(self):
        # Define the logic to calculate compatibility score
        pass

    def confirm_match(self):
        # Logic to confirm match
        pass

    def reject_match(self):
        # Logic to reject match
        pass

    def __str__(self):
        return f"Match {self.matchid} between {self.userid} and {self.maybe_roommateid}"

class Review(models.Model):
    reviewer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='given_reviews')  # The user giving the review
    reviewee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_reviews')  # The user receiving the review
    rating = models.FloatField()  # Rating given in the review
    comment = models.TextField()  # The comment for the review
    date_posted = models.DateField(auto_now_add=True)  # The date the review was posted

    def post_review(self):
        """ Posts a review """
        self.save()  # Save the review instance

    def display(self):
        """ Displays the review details """
        return f"Review by {self.reviewer} on {self.reviewee}: {self.rating}/5 - {self.comment}"

    def edit_review(self, new_rating, new_comment):
        """ Edits the review details """
        self.rating = new_rating
        self.comment = new_comment
        self.save()  # Save the updated review instance

    def delete_review(self):
        """ Deletes the review """
        self.delete()  # Deletes the review instance

    def __str__(self):
        return f"Review by {self.reviewer} on {self.reviewee}: {self.rating}/5"

class Notifications(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Link to the user receiving the notification
    message = models.CharField(max_length=255)  # Notification message
    is_read = models.BooleanField(default=False)  # Whether the notification has been read
    timestamp = models.DateTimeField(auto_now_add=True)  # Time when the notification was created

    def mark_as_read(self):
        """ Marks the notification as read. """
        self.is_read = True
        self.save()

    @classmethod
    def mark_all_as_read(cls, user):
        """ Marks all notifications for a specific user as read. """
        cls.objects.filter(user=user, is_read=False).update(is_read=True)

    def __str__(self):
        return f"Notification for {self.user}: {self.message}"
    
class Search:
    def __init__(self, posts_queryset):
        self.posts = posts_queryset  # Initialize with a queryset of posts

    def search_by_location(self, location_query):
        return self.posts.filter(location__icontains=location_query) # Filter by location

    def search_by_price(self, min_price, max_price):
        return self.posts.filter(price__gte=min_price, price__lte=max_price) # Filter by price range

    def search_by_rooms(self, room_count):
        return self.posts.filter(number_rooms=room_count) # Filter by number of rooms

    def display_result(self):
        return self.posts.all() # Display all results

    def __str__(self):
        return "Search functionality"