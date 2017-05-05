from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class Account(AbstractUser):

    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(default='name@gmail.com')

    def __str__(self):

        return self.username


class Profile(models.Model):

    user = models.OneToOneField(Account, on_delete=models.CASCADE)
    city = models.CharField(max_length=200)
    state = models.CharField(max_length=200)
    country = models.CharField(max_length=200)
    profile_image = models.ImageField(upload_to='media', default='media/user_default.png')

    def __str__(self):

        return self.user.first_name + " " + self.user.last_name





