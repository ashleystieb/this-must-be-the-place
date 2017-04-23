from django.shortcuts import render

# Create your views here.


def return_restaurant(request, username=None):

    template = 'index.html'
    context = {

    }

    return render(request, template, context)
