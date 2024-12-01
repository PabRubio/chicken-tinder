from django import forms
from .models import Profile, Image

class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['name', 'breed', 'age', 'location', 'bio',
                  'egg_production', 'temperament', 'foraging_skill', 'favorite_food']
        widgets = {
            'bio': forms.Textarea(attrs={'rows': 4, 'maxlength': 250}),
            'breed': forms.Select(choices=Profile.BREED_CHOICES, attrs={
                'class': 'w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-base text-white shadow-sm'}),
            'egg_production': forms.Select(choices=Profile.EGG_PRODUCTION_CHOICES, attrs={
                'class': 'w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-base text-white shadow-sm'}),
            'temperament': forms.Select(choices=Profile.TEMPERAMENT_CHOICES, attrs={
                'class': 'w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-base text-white shadow-sm'}),
            'foraging_skill': forms.Select(choices=Profile.FORAGING_SKILL_CHOICES, attrs={
                'class': 'w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-base text-white shadow-sm'}),
            'favorite_food': forms.Select(choices=Profile.FAVORITE_FOOD_CHOICES, attrs={
                'class': 'w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-base text-white shadow-sm'}),
        }

class ImageForm(forms.ModelForm):
    class Meta:
        model = Image
        fields = ['image']

ChickenImageFormSet = forms.inlineformset_factory(
    Profile, Image, form=ImageForm, extra=1, max_num=6, can_delete=True
)
