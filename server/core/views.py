from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from .forms import IncomingEmailForm, RejectedEmailForm
from .models import IncomingEmail, RejectedEmail, Address


@csrf_exempt
def webhook(request):
    form = IncomingEmailForm(request.POST)
    info = "Message Denied"
    code = 400
    if form.is_valid():
        addr_exists = Address.objects.filter(
            email=form.cleaned_data["recipients"],
            enabled=True
        ).exists()
        if addr_exists:
            form.save()
            info = "Success"
            code = 200
        else:
            fields = {}
            for field in form.cleaned_data:
                fields[field] = form.cleaned_data[field]
            RejectedEmail.objects.create(**fields)
            info = "No such user"
    return HttpResponse(info, status=code)
