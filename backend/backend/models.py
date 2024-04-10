
from django.http import HttpResponse
from django.db import models


class Registration(models.Model):
    Name = models.CharField(max_length=30)
    Email = models.EmailField()
    Password = models.CharField(max_length =128)

    class Meta:
        db_table = "Registration"

class Credentials(models.Model):
    Email = models.EmailField()
    SiteName = models.CharField(max_length = 30)
    Username = models.CharField(max_length = 30)
    Password = models.CharField(max_length = 128)

    class Meta:
        db_table = "Credentials"

    
