from django.db import models

# Create your models here.


class Account(models.Model):

    username = models.CharField(max_length=30)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    # email = models.EmailField()
    bio = models.TextField(default='Biography')

    def __str__(self):

        return self.username

