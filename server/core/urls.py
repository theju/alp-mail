from django.conf.urls import url

import core.views


urlpatterns = [
    url(r'^webhook/auth/$', core.views.webhook_auth),
    url(r'^webhook/mail/$', core.views.webhook_mail),
]
