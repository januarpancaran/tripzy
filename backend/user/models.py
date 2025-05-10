from django.db import models
from django.contrib.auth.models import AbstractUser

class Users(AbstractUser):
    no_hp = models.CharField(max_length=50, blank=True, null=True)
    jenis_kelamin = models.CharField(
        max_length=10, 
        choices=[("L", "Laki-laki"), ("P", "Perempuan")],
        blank=True,
        null=True,
    )
    tanggal_lahir = models.DateField(blank=True, null=True)
    kota_tinggal = models.CharField(max_length=50, blank=True, null=True)


    def __str__(self):
        return self.username