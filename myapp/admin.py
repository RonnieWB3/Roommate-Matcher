from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, PreferenceSheet, Post, Message, Match, Review, Notifications

admin.site.register(User, UserAdmin)
admin.site.register(Post)
admin.site.register(PreferenceSheet)
admin.site.register(Message)
admin.site.register(Match)
admin.site.register(Review)
admin.site.register(Notifications)