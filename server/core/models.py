from __future__ import unicode_literals

from django.db import models


class Address(models.Model):
    email = models.EmailField(unique=True)
    enabled = models.BooleanField(default=True)
    description = models.TextField(null=True)
    created_on = models.DateTimeField(auto_now_add=True)
    modified_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.email

    class Meta:
        ordering = ["-modified_on", "-created_on"]
        verbose_name_plural = "addresses"


class Email(models.Model):
    sender = models.CharField(max_length=100, db_index=True)
    recipients = models.CharField(max_length=255, db_index=True)
    subject = models.TextField()
    body = models.TextField()
    headers = models.TextField()
    received_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.subject

    class Meta:
        ordering = ["-received_on"]
        abstract = True


class IncomingEmail(Email):
    pass

class RejectedEmail(Email):
    pass
