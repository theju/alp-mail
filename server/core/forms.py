import re
import base64
import quopri

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

    def clean_subject(self):
        subject = self.cleaned_data["subject"]
        utf_subject = re.search("\?utf-8\?(B|Q)\?(.*?)$", subject, re.I)
        if utf_subject:
            if utf_subject.groups()[0].lower() == "b":
                # Base-64 encoded emails
                subject = base64.b64decode(utf_subject.groups()[1]).decode()
            else:
                # Quote-Printable emails
                subject = quopri.decodestring(utf_subject.groups()[1]).decode()
        return subject


class AuthEmailForm(forms.ModelForm):
    class Meta:
        model = IncomingEmail
        fields = ["sender", "recipients"]
