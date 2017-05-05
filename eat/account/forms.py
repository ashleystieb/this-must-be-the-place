from django import forms
from .models import Profile


class ProfileEdit(forms.ModelForm):

    city = forms.CharField(required=False)
    state = forms.CharField(required=False)
    country = forms.CharField(required=False)
    profile_image = forms.ImageField(required=False)

    class Meta:

        model = Profile
        fields = [
            'city',
            'state',
            'country',
            'profile_image',
        ]
    #
    # def __init__(self, *args, **kwargs):
    #     super(ProfileEdit, self).__init__(*args, **kwargs)
    #     self.fields['city'].required = False
    #     self.fields['state'].required = False
    #     self.fields['country'].required = False
    #     self.fields['profile_image'].required = False
    #
    #
