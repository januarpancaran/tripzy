# Generated by Django 5.2.1 on 2025-05-12 16:03

import django.core.validators
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Hotel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nama', models.CharField(max_length=255)),
                ('alamat', models.CharField(max_length=255)),
                ('harga_per_malam', models.IntegerField(validators=[django.core.validators.MinValueValidator(0)])),
            ],
        ),
        migrations.CreateModel(
            name='Kendaraan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nama', models.CharField(max_length=255)),
                ('tipe', models.CharField(max_length=255)),
                ('harga', models.IntegerField(validators=[django.core.validators.MinValueValidator(0)])),
            ],
        ),
        migrations.CreateModel(
            name='Kota',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nama', models.CharField(max_length=255)),
                ('provinsi', models.CharField(blank=True, max_length=255)),
                ('negara', models.CharField(default='Indonesia', max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Trip',
            fields=[
                ('trip_id', models.AutoField(primary_key=True, serialize=False)),
                ('nama_trip', models.CharField(max_length=255)),
                ('jumlah_orang', models.IntegerField(validators=[django.core.validators.MinValueValidator(1)])),
                ('lama_perjalanan', models.IntegerField(validators=[django.core.validators.MinValueValidator(1)])),
                ('tanggal_berangkat', models.DateField()),
                ('asal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='asal_trip', to='trip.kota')),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
                ('tujuan', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tujuan_trip', to='trip.kota')),
            ],
        ),
        migrations.CreateModel(
            name='RencanaPerjalanan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('estimasi_biaya', models.IntegerField(validators=[django.core.validators.MinValueValidator(0)])),
                ('hotel', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='trip.hotel')),
                ('kendaraan', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='trip.kendaraan')),
                ('trip_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='trip.trip')),
            ],
        ),
    ]
