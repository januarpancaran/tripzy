from django.db import models
from django.contrib.auth.hashers import make_password

class User(models.Model):
    ROLES = (
        ('admin', 'Admin'),
        ('user', 'User'),
    )

    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50, unique=True)
    nama = models.CharField(max_length=50)
    password = models.CharField(max_length=128)
    email = models.CharField(max_length=50, null=True, blank=True)
    no_hp = models.CharField(max_length=50, null=True, blank=True)
    role = models.CharField(max_length=10, choices=ROLES, default='user')

    def save(self, *args, **kwargs):
        if not self.password.startswith('pbkdf2_'):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self): 
        return str(self.username)