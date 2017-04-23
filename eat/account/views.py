from django.shortcuts import render, get_object_or_404
from .models import Account


# Create your views here.


def accounts_view(request):

    accounts = Account.objects.all()
    template = 'accounts_view.html'
    context = {
        "list_all": accounts
    }

    return render(request, template, context)


def profile_view(request, username=None):

    query = get_object_or_404(Account, username=username)
    template = 'profile.html'
    context = {
        'object': query,
    }

    return render(request, template, context)

