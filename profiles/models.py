from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    BREED_CHOICES = [
        ('Rhode Island Red', 'Rhode Island Red'),
        ('Leghorn', 'Leghorn'),
        ('Australorp', 'Australorp'),
        ('Plymouth Rock', 'Plymouth Rock'),
        ('Orpington', 'Orpington'),
        ('Wyandotte', 'Wyandotte'),
        ('Sussex', 'Sussex'),
        ('Brahma', 'Brahma'),
        ('Cochin', 'Cochin'),
        ('Silkie', 'Silkie'),
        ('Marans', 'Marans'),
        ('Ameraucana', 'Ameraucana'),
    ]

    EGG_PRODUCTION_CHOICES = [
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High'),
    ]

    TEMPERAMENT_CHOICES = [
        ('Shy', 'Shy'),
        ('Friendly', 'Friendly'),
        ('Aggressive', 'Aggressive'),
    ]

    FORAGING_SKILL_CHOICES = [
        ('Novice', 'Novice'),
        ('Intermediate', 'Intermediate'),
        ('Expert', 'Expert'),
    ]

    FAVORITE_FOOD_CHOICES = [
        ('Corn', 'Corn'),
        ('Mealworms', 'Mealworms'),
        ('Vegetables', 'Vegetables'),
        ('Scratch', 'Scratch'),
    ]

    chicken = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    breed = models.CharField(max_length=50)
    age = models.PositiveIntegerField(default=2)
    location = models.CharField(max_length=100)
    bio = models.TextField(max_length=250)
    egg_production = models.CharField(max_length=20)
    temperament = models.CharField(max_length=20)
    foraging_skill = models.CharField(max_length=20)
    favorite_food = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class ChickenImage(models.Model):
    profile = models.ForeignKey(
        Profile, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='chicken_images/')

    def __str__(self):
        return f"Image for {self.profile.name}"
