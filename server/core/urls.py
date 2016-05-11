from django.conf.urls import url

import core.views


urlpatterns = [
    url(r'^webhook/$', core.views.webhook),
]
