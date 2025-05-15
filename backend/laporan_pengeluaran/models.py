from django.db import models
from trip.models import Trip, RencanaPerjalanan

class LaporanPengeluaran(models.Model):
    laporan_id = models.AutoField(primary_key=True)
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    rencana = models.ForeignKey(RencanaPerjalanan, on_delete=models.CASCADE)
    total_biaya = models.IntegerField()
    biaya_per_orang = models.IntegerField()