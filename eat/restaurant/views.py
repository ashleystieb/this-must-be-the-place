from django.shortcuts import render, get_object_or_404
from .models import Restaurant


# Create your views here.

def list_view(request):

    restaurants = Restaurant.objects.all()
    template = 'list_view.html'
    context = {
        "all": restaurants
    }

    return render(request, template, context)


def item_view(request, slug=None):

    query = get_object_or_404(Restaurant, slug=slug)
    template = 'restaurant.html'
    context = {
        'object': query,
    }

    return render(request, template, context)

