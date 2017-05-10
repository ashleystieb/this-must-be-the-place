from django.db import models
from django.template.defaultfilters import slugify
from django.core.urlresolvers import reverse
from account.models import Account

# Create your models here.


class Restaurant(models.Model):

    name = models.CharField(max_length=200)
    website = models.CharField(max_length=300)
    user = models.ForeignKey(Account, on_delete=models.CASCADE)

    def __str__(self):

        return self.name

    # name = models.CharField(max_length=30)
    # cuisine = models.CharField(max_length=30)
    # slug = models.SlugField()
    # LOW = '$'
    # MED = '$$'
    # HIGH = '$$$'
    # PRICE_CHOICES = (
    #     (LOW, '$'),
    #     (MED, '$$'),
    #     (HIGH, '$$$'),
    # )
    # price_range = models.CharField(
    #     max_length=3,
    #     choices=PRICE_CHOICES,
    #     default=LOW,
    # )
    #
    # def is_low(self):
    #     return self.price_range in self.LOW
    #
    # def is_med(self):
    #     return self.price_range in self.MED
    #
    # def is_high(self):
    #     return self.price_range in self.HIGH
    #
    # def __str__(self):
    #
    #     return self.name
    #
    # def get_absolute_url(self):
    #
    #     return reverse('item_view', args=(slugify(self.name)))
    #
