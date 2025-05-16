from django.db import models
from trip.models import Trip


class Pengingat(models.Model):
    pengingat_id = models.AutoField(primary_key=True)
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    waktu_pengingat = models.DateField()
    is_sent = models.BooleanField()

    def __str__(self):
        return f"Pengingat untuk {self.trip.nama_trip} pada {self.waktu_pengingat}"
