# Generated by Django 5.2.1 on 2025-05-13 13:03

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trip', '0002_rename_trip_id_rencanaperjalanan_trip'),
    ]

    operations = [
        migrations.AddField(
            model_name='rencanaperjalanan',
            name='jumlah_kamar',
            field=models.IntegerField(default=1, validators=[django.core.validators.MinValueValidator(1)]),
        ),
    ]
