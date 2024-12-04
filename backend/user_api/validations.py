from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
UserModel = get_user_model()

def custom_validation(data):
    email = data['email'].strip()
    username = data['username'].strip()
    password = data['password'].strip()
    ##
    if not email or UserModel.objects.filter(email=email).exists(): # if email is empty or already exists
        raise ValidationError('choose another email')
    ##
    if not password or len(password) < 8: # if password is empty or less than 8 characters
        raise ValidationError('choose another password, min 8 characters')
    ##
    if not username: # if username is empty
        raise ValidationError('choose another username')
    return data


def validate_email(data): 
    email = data['email'].strip()
    if not email: # if email is empty
        raise ValidationError('an email is needed')
    return True

def validate_username(data):
    username = data['username'].strip()
    if not username: # if username is empty
        raise ValidationError('choose another username')
    return True

def validate_password(data):
    password = data['password'].strip()
    if not password: # if password is empty
        raise ValidationError('a password is needed')
    return True