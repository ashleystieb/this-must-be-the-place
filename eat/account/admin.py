from django.contrib import admin
from .models import Account


# Register your models here.


class AccountAdmin(admin.ModelAdmin):

    list_display = ['__str__', 'first_name', 'last_name']

    class Meta:
        model = Account


admin.site.register(Account, AccountAdmin)

