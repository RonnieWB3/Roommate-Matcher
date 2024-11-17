from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from .models import Post, Comment, Message, Match
from rest_framework.exceptions import ValidationError

UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = '__all__'
	def create(self, clean_data):
		user_obj = UserModel.objects.create_user(email=clean_data['email'], password=clean_data['password'])
		user_obj.username = clean_data['username']
		user_obj.save()
		return user_obj

class UserLoginSerializer(serializers.Serializer):
	email = serializers.EmailField()
	password = serializers.CharField()
	##
	def check_user(self, clean_data):
		user = authenticate(username=clean_data['email'], password=clean_data['password'])
		if not user:
			raise ValidationError('user not found')
		return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('user_id', 'email', 'username', 'bio', 'profile_picture', 'background_picture', 'age', 'location')
        read_only_fields = ('user_id', 'email',)
    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.bio = validated_data.get('bio', instance.bio)
        instance.profile_picture = validated_data.get('profile_picture', instance.profile_picture)
        instance.background_picture = validated_data.get('background_picture', instance.background_picture)
        instance.age = validated_data.get('age', instance.age)
        instance.location = validated_data.get('location', instance.location)
        instance.save()
        return instance

# New Serializers

class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Post
        fields = ['post_id', 'user', 'title', 'content', 'cost', 'location', 'created_at']

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    post = serializers.PrimaryKeyRelatedField(queryset=Post.objects.all())
    
    class Meta:
        model = Comment
        fields = ['comment_id', 'post', 'user', 'content', 'created_at']

class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    receiver = serializers.PrimaryKeyRelatedField(queryset=UserModel.objects.all())
    
    class Meta:
        model = Message
        fields = ['message_id', 'sender', 'receiver', 'content', 'timestamp', 'is_read']

class MatchSerializer(serializers.ModelSerializer):
    user_one = UserSerializer(read_only=True)
    user_two = UserSerializer(read_only=True)
    
    class Meta:
        model = Match
        fields = ['match_id', 'user_one', 'user_two', 'created_at', 'compatibility_score']