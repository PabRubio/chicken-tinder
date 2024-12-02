from django.contrib import admin
from .models import Profile, Image

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'breed', 'age', 'location', 'egg_production',
                    'temperament', 'foraging_skill', 'favorite_food')
    list_filter = ('breed', 'egg_production', 'temperament',
                   'foraging_skill', 'favorite_food')
    search_fields = ('name', 'breed', 'location', 'bio')

@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ('profile', 'image')
    search_fields = ('profile__name',)
