from django import forms
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class LoginForm(AuthenticationForm):
    username = forms.CharField(
        widget=forms.TextInput(attrs={
            'class': 'w-full py-2 pl-10 pr-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500',
            'placeholder': 'Username'
        })
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'class': 'w-full py-2 pl-10 pr-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500',
            'placeholder': 'Password'
        })
    )

    error_messages = {
        'invalid_login': "Please enter a correct username and password. Note that both fields may be case-sensitive.",
        'inactive': "This account is inactive.",
    }

class SignUpForm(UserCreationForm):
    username = forms.CharField(
        widget=forms.TextInput(attrs={
            'class': 'w-full py-2 pl-10 pr-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500',
            'placeholder': 'Username'
        })
    )
    password1 = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'class': 'w-full py-2 pl-10 pr-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500',
            'placeholder': 'Password'
        })
    )
    password2 = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'class': 'w-full py-2 pl-10 pr-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500',
            'placeholder': 'Confirm Password'
        })
    )

    class Meta:
        model = User
        fields = ('username', 'password1', 'password2')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            field.error_messages = {
                'required': '{fieldname} is required'.format(fieldname=field.label)}