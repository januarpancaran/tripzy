from django.db import models

# Create your models here.
class Diskon(models.Model):
    class TipeDiskon(models.TextChoices):
        PERSEN = 'persen', 'Persen'
        CASHBACK = 'cashback', 'Cashback'

    code = models.CharField(max_length=10)
    description = models.TextField(default="", blank=True)
    tipe_diskon = models.CharField(
        max_length=10,
        choices=TipeDiskon.choices,
        default=TipeDiskon.PERSEN,
    )
    value = models.IntegerField()
    min_transaksi = models.IntegerField()
    expires_at = models.DateField()

    def __str__(self):
        return f"{self.code} - {self.value} ({self.tipe_diskon})"
