from django.urls import re_path

import core.views


urlpatterns = [
    re_path(r'^webhook/auth/$', core.views.webhook_auth),
    re_path(r'^webhook/mail/$', core.views.webhook_mail),
]
