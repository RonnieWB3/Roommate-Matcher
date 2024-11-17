from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer, PostSerializer, CommentSerializer, MessageSerializer, MatchSerializer
from rest_framework import permissions, status,generics
from .validations import custom_validation, validate_email, validate_password
from .models import Post, Comment, Message, Match, AppUser
from django.shortcuts import get_object_or_404
from django.db.models import Q
from rest_framework.exceptions import ValidationError

class UserRegister(APIView):
	permission_classes = (permissions.AllowAny,)
	def post(self, request):
		clean_data = custom_validation(request.data)
		serializer = UserRegisterSerializer(data=clean_data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.create(clean_data)
			if user:
				return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (SessionAuthentication,)
	##
	def post(self, request):
		data = request.data
		assert validate_email(data)
		assert validate_password(data)
		serializer = UserLoginSerializer(data=data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.check_user(data)
			login(request, user)
			return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)


class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	##
	def get(self, request):
		serializer = UserSerializer(request.user)
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)

class PostListCreateView(generics.ListCreateAPIView):
    """
    GET: List all posts.
    POST: Create a new post.
    """
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET: Retrieve a specific post.
    PUT/PATCH: Update a post.
    DELETE: Delete a post.
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    # To allow only owners to edit/delete, you can define a custom permission

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            self.permission_classes = [permissions.IsAuthenticated, IsOwner]
        else:
            self.permission_classes = [permissions.IsAuthenticated]
        return super().get_permissions()

# --- Comments ---

class CommentListCreateView(generics.ListCreateAPIView):
    """
    GET: List all comments for a specific post.
    POST: Create a new comment for a specific post.
    """
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        post_id = self.kwargs.get('post_id')
        return Comment.objects.filter(post__post_id=post_id).order_by('created_at')
    
    def perform_create(self, serializer):
        post_id = self.kwargs.get('post_id')
        post = get_object_or_404(Post, post_id=post_id)
        serializer.save(user=self.request.user, post=post)

# --- Messages ---

class MessagingView(APIView):
    """
    GET: Retrieve all messages for the authenticated user.
    POST: Send a new message.
    """
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        # Fetch messages where the user is sender or receiver
        messages = Message.objects.filter(
            Q(sender=request.user) | Q(receiver=request.user)
        ).order_by('timestamp')
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            receiver = serializer.validated_data['receiver']
            if receiver == request.user:
                return Response({'error': 'Cannot send message to yourself.'}, status=status.HTTP_400_BAD_REQUEST)
            serializer.save(sender=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# --- Matches ---

class MatchListCreateView(generics.ListCreateAPIView):
    """
    GET: List all matches for the authenticated user.
    POST: Create a new match between two users.
    """
    serializer_class = MatchSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Match.objects.filter(Q(user_one=self.request.user) | Q(user_two=self.request.user)).order_by('-created_at')
    
    def perform_create(self, serializer):
        user_two = serializer.validated_data.get('user_two')
        if user_two == self.request.user:
            raise ValidationError("Cannot match with yourself.")
        # Check if match already exists
        if Match.objects.filter(
            Q(user_one=self.request.user, user_two=user_two) | 
            Q(user_one=user_two, user_two=self.request.user)
        ).exists():
            raise ValidationError("Match already exists.")
        # Calculate compatibility score (implement your own logic)
        compatibility_score = calculate_compatibility(self.request.user, user_two)
        serializer.save(user_one=self.request.user, compatibility_score=compatibility_score)

# --- Custom Permission ---

from rest_framework.permissions import BasePermission

class IsOwner(BasePermission):
    """
    Custom permission to only allow owners of an object to edit or delete it.
    """
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user

# --- Utility Function for Compatibility Score ---

def calculate_compatibility(user_one, user_two):
    """
    Calculate a compatibility score between two users.
    Implement your own logic based on shared interests, budget, location, etc.
    """
    score = 0
    if user_one.location == user_two.location:
        score += 30
    if user_one.age and user_two.age:
        age_diff = abs(user_one.age - user_two.age)
        if age_diff <= 5:
            score += 20
    if user_one.bio and user_two.bio:
        # Simple keyword match example
        bio_keywords_one = set(user_one.bio.lower().split())
        bio_keywords_two = set(user_two.bio.lower().split())
        shared_keywords = bio_keywords_one.intersection(bio_keywords_two)
        score += min(len(shared_keywords) * 2, 20)  # Max 20 points from bio
    # Add more criteria as needed
    return score

class ProfileView(generics.RetrieveAPIView):
    """
    Retrieve a user's profile by ID.
    """
    queryset = AppUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'user_id'
# user_api/views.py
from .models import Post
from .serializers import PostSerializer

class UserPostsView(generics.ListAPIView):
    """
    List all posts created by a specific user.
    """
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        return Post.objects.filter(user__id=user_id).order_by('-created_at')
class ProfileEditView(generics.RetrieveUpdateAPIView):
    """
    Retrieve and update the authenticated user's profile.
    """
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user