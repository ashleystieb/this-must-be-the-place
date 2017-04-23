from django.contrib import admin
from .models import Restaurant


# Register your models here.

class RestaurantAdmin(admin.ModelAdmin):

    list_display = ['__str__', 'cuisine', 'price_range']

    class Meta:

        model = Restaurant

admin.site.register(Restaurant, RestaurantAdmin)

