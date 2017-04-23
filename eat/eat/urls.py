"""eat URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from restaurant import views as restaurant_views
from account import views
from get_restaurant import views as result_views



urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^restaurants/$', restaurant_views.list_view, name='list_view'),
    url(r'^accounts/$', views.accounts_view, name='accounts_view'),
    url(r'^accounts/(?P<username>[\w.@+-]+)/$', views.profile_view, name='accounts_view.profile_view'),
    url(r'^restaurants/(?P<slug>[\w-]+)/', restaurant_views.item_view, name='item_view'),
    url(r'^index/', result_views.return_restaurant, name='index'),
]
