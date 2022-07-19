from django.urls import re_path
from django.contrib import admin

import core.urls


urlpatterns = [
    re_path(r'^admin/', admin.site.urls),
]

urlpatterns += core.urls.urlpatterns
