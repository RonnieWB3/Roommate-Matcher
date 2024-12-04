# user_api/urls.py
from django.urls import path
from . import views

urlpatterns = [
    # User Authentication Endpoints
    path('register/', views.UserRegister.as_view(), name='register'),
    path('login/', views.UserLogin.as_view(), name='login'),
    path('logout/', views.UserLogout.as_view(), name='logout'),
    path('user/', views.UserView.as_view(), name='user'),
    # Profile Endpoints
    path('profile/<int:user_id>/', views.ProfileView.as_view(), name='profile'),
    path('profile/<int:user_id>/posts/', views.UserPostsView.as_view(), name='user-posts'),
    # Posts Endpoints
    path('posts/', views.PostListCreateView.as_view(), name='posts'),
    path('posts/<int:pk>/', views.PostDetailView.as_view(), name='post-detail'),
    # Comments Endpoints
    path('posts/<int:post_id>/comments/', views.CommentListCreateView.as_view(), name='post-comments'),
    # Messaging Endpoints
    path('messages/', views.MessagingView.as_view(), name='messages'),
    # Matches Endpoints
    path('matches/', views.MatchListCreateView.as_view(), name='matches'),
    # Profile Editing Endpoint
    path('profile/edit/', views.ProfileEditView.as_view(), name='profile-edit'),
]
