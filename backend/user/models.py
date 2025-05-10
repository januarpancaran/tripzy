from django.db import models
from django.contrib.auth.models import AbstractUser

class Users(AbstractUser):
    no_hp = models.CharField(max_length=50, blank=False)

    def __str__(self):
        return self.username