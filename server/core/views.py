from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from .forms import IncomingEmailForm, AuthEmailForm
from .models import IncomingEmail, Address


@csrf_exempt
def webhook_auth(request):
    form = AuthEmailForm(request.POST)
    info = "Message Denied"
    code = 400
    if form.is_valid():
        addr_exists = Address.objects.filter(
            email=form.cleaned_data["recipients"],
            enabled=True
        ).exists()
        if addr_exists:
            code = 200
            info = "Success"
        else:
            info = "No such user"
    return HttpResponse(info, status=code)


@csrf_exempt
def webhook_mail(request):
    form = IncomingEmailForm(request.POST)
    info = "Message Denied"
    code = 400
    if form.is_valid():
        form.save()
        info = "Success"
        code = 200
    return HttpResponse(info, status=code)
