from django import forms

from .models import IncomingEmail


class EmailForm(forms.ModelForm):
    # Future placeholder
    pass


class EmailFormMeta(object):
    exclude = ["received_on"]


class IncomingEmailForm(EmailForm):
    class Meta(EmailFormMeta):
        model = IncomingEmail


class AuthEmailForm(forms.ModelForm):
    class Meta:
        model = IncomingEmail
        fields = ["sender", "recipients"]
