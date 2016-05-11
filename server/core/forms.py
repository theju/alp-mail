from django import forms

from .models import IncomingEmail, RejectedEmail


class EmailForm(forms.ModelForm):
    # Future placeholder
    pass


class EmailFormMeta(object):
    exclude = ["received_on"]


class IncomingEmailForm(EmailForm):
    class Meta(EmailFormMeta):
        model = IncomingEmail


class RejectedEmailForm(EmailForm):
    class Meta(EmailFormMeta):
        model = RejectedEmail
