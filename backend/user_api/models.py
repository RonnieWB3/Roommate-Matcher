from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser, PermissionsMixin

class AppUserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('The Email field must be set')
        if not password:
            raise ValueError('The Password field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email)
        user.set_password(password)
        user.save()
        return user
    def create_superuser(self, email, password=None):
        if not email:
            raise ValueError('The Email field must be set')
        if not password:
            raise ValueError('The Password field must be set')
        user = self.create_user(email, password)
        user.is_superuser = True
        user.save()
        return user
class AppUser(AbstractUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50,unique=True)
    username = models.CharField(max_length=50)
    bio = models.TextField(blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    background_picture = models.ImageField(upload_to='background_pics/', blank=True, null=True)
    age = models.PositiveIntegerField(null=True, blank=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    objects = AppUserManager()
    def __str__(self):
        return self.username
    
# user_api/models.py
class Post(models.Model):
    post_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name='posts')
    title = models.CharField(max_length=100)
    content = models.TextField()
    cost = models.DecimalField(max_digits=10, decimal_places=2)  # e.g., monthly rent
    location = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} by {self.user.username}"

# user_api/models.py
class Comment(models.Model):
    comment_id = models.AutoField(primary_key=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.user.username} on {self.post.title}"
# user_api/models.py
class Message(models.Model):
    message_id = models.AutoField(primary_key=True)
    sender = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name='received_messages')
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['timestamp']

    def __str__(self):
        return f"From {self.sender.username} to {self.receiver.username} at {self.timestamp}"
# user_api/models.py
class Match(models.Model):
    match_id = models.AutoField(primary_key=True)
    user_one = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name='matches_initiated')
    user_two = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name='matches_received')
    created_at = models.DateTimeField(auto_now_add=True)
    compatibility_score = models.DecimalField(max_digits=5, decimal_places=2)  # e.g., 95.50%

    class Meta:
        unique_together = ('user_one', 'user_two')

    def __str__(self):
        return f"Match between {self.user_one.username} and {self.user_two.username} with score {self.compatibility_score}%"
