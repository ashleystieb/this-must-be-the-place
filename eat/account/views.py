from django.shortcuts import render, get_object_or_404
from django.shortcuts import redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth.decorators import login_required
from .models import Account, Profile
from .forms import ProfileEdit


# Create your views here.

def index_view(request):

    template = 'index.html'

    return render(request, template)


def login_view(request):

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
        user = authenticate(username=username, password=password)

        if user is not None:
            login(request,user)

            # Redirect to success page/profile
            return redirect('/search/')

            # return redirect('/profile/{}'.format(username))

        else:

            # Return an 'invalid login' error message
            form = AuthenticationForm(data=request.POST)
            context = {
                'form': form,
            }

            return render(request, 'login.html', context)


def logout_view(request):
    logout(request)

    return redirect('index')


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
        profile = Profile(user=person, city='Portland', state='Oregon', country='USA')
        profile.save()

        return redirect('search')

    context = {'form': form}
    return render(request, 'register.html', context)


@login_required(login_url='/login')
def profile_view(request, username):

    user = get_object_or_404(Account, username=username)
    profile = get_object_or_404(Profile, user=user)
    photo = profile.profile_image.url
    city = profile.city
    state = profile.state
    country = profile.country

    template = 'profile.html'

    context = {
        'user': user,
        'profile': profile,
        'photo': photo,
        'city': city,
        'state': state,
        'country': country,
    }

    return render(request, template, context)


@login_required(login_url='/login')
def edit_profile(request, username):

    user = get_object_or_404(Account, username=username)
    profile = get_object_or_404(Profile, user=user)

    form = ProfileEdit(request.POST or None, request.FILES or None)
    if form.is_valid():
        city = request.POST.get('city', False)
        if city != "":
            profile.city = city
        state = request.POST.get('state', False)
        if state != "":
            profile.state = state
        country = request.POST.get('country', False)
        if country != "":
            profile.country = country
        profile_image = request.FILES.get('profile_image', False)
        if profile_image != False:
            profile.profile_image = profile_image
        profile.save()

        return redirect('/profile/{}'.format(username))

    context = {
        'form': form,
    }

    return render(request, 'edit_profile.html', context)

