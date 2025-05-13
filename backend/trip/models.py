from django.db import models
from django.core.validators import MinValueValidator
from user.models import Users

class Kota(models.Model):
    nama = models.CharField(max_length=255)
    provinsi = models.CharField(max_length=255, blank=True)
    negara = models.CharField(max_length=255, default="Indonesia")

    def __str__(self):
        return self.nama

class Hotel(models.Model):
    nama = models.CharField(max_length=255)
    alamat = models.CharField(max_length=255)
    harga_per_malam = models.IntegerField(validators=[MinValueValidator(0)])

    def __str__(self):
        return self.nama

class Kendaraan(models.Model):
    nama = models.CharField(max_length=255)
    tipe = models.CharField(max_length=255)
    harga = models.IntegerField(validators=[MinValueValidator(0)])

    def __str__(self):
        return self.nama

class Trip(models.Model):
    trip_id = models.AutoField(primary_key=True)
    nama_trip = models.CharField(max_length=255)
    created_by = models.ForeignKey(Users, on_delete=models.SET_NULL, null=True)
    asal = models.ForeignKey(Kota, on_delete=models.CASCADE, related_name="asal_trip")
    tujuan = models.ForeignKey(Kota, on_delete=models.CASCADE, related_name="tujuan_trip")
    jumlah_orang = models.IntegerField(validators=[MinValueValidator(1)])
    lama_perjalanan = models.IntegerField(validators=[MinValueValidator(1)])
    tanggal_berangkat = models.DateField()

    def __str__(self):
        return self.nama_trip

class RencanaPerjalanan(models.Model):
    rencana_id = models.AutoField(primary_key=True)
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE) 
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, null=True, blank=True)
    jumlah_kamar = models.IntegerField(validators=[MinValueValidator(1)], default=1)
    kendaraan = models.ForeignKey(Kendaraan, on_delete=models.CASCADE, null=True, blank=True)
    estimasi_biaya = models.IntegerField(validators=[MinValueValidator(0)])

    def __str__(self):
        return self.trip_id.nama_trip