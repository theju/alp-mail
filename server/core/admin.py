from django.contrib import admin

from .models import IncomingEmail, Address


class AddressAdmin(admin.ModelAdmin):
    list_display = ["email", "enabled", "created_on", "modified_on"]

class IncomingEmailAdmin(admin.ModelAdmin):
    list_display = ["sender", "recipients", "subject", "received_on"]


admin.site.register(Address, AddressAdmin)
admin.site.register(IncomingEmail, IncomingEmailAdmin)
