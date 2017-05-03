from django.shortcuts import render
from django.shortcuts import redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from .models import Account

# Create your views here.


def my_view(request):

    """
    Handles a GET and POST request for logging in
    our custom users.

    """

    if request.method == 'GET':
        form = AuthenticationForm()
        context = {
            'form': form,
        }

        return render(request, 'login.html', context)

    elif request.method == 'POST':

        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request,user)

            # Redirect to success page/profile
            return redirect('/home')

        else:

            # Return an 'invalid login' error message
            form = AuthenticationForm(data=request.POST)
            context = {
                'form': form,
            }

            return render(request, 'login.html', context)


def logout_view(request):
    logout(request)

    return redirect('/login')


def create_person(request):
    if request.method == 'GET':

        form = UserCreationForm()

    if request.method == 'POST':
        # form = UserCreationForm(data=request.POST)

        username = request.POST['username']
        password1 = request.POST['password1']
        password2 = request.POST['password2']
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        email = request.POST['email']
        person = Account.objects.create_user(username=username, password=password2, first_name=first_name, last_name=last_name, email=email)
        person.save()

        return redirect('home')

    context = {'form': form}
    return render(request, 'register.html', context)


def profile_view(request):
    pass