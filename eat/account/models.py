from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class Account(AbstractUser):

    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(default='name@gmail.com')

    def __str__(self):

        return self.username
