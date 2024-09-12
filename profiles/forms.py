from django import forms
from .models import Profile, ChickenImage

class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['name', 'breed', 'age', 'location', 'bio',
                  'egg_production', 'temperament', 'foraging_skill', 'favorite_food']
        widgets = {
            'bio': forms.Textarea(attrs={'rows': 4, 'maxlength': 250}),
        }

class ImageForm(forms.ModelForm):
    class Meta:
        model = ChickenImage
        fields = ['image']

ChickenImageFormSet = forms.inlineformset_factory(
    Profile, ChickenImage, form=ImageForm, extra=1, max_num=6, can_delete=True
)
