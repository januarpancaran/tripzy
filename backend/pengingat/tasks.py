from celery import shared_task
from django.conf import settings
from django.core.mail import send_mail
from django.utils.timezone import localdate
from trip_member.models import TripMember

from .models import Pengingat

@shared_task
def check_and_send_reminders():
    today = localdate()

    reminders_today = Pengingat.objects.filter(
        waktu_pengingat=today,
        is_sent=False,
    ).select_related("trip")

    for reminder in reminders_today:
        trip = reminder.trip
        members = TripMember.objects.filter(
            trip=trip,
            status="joined",
        ).select_related("user")

        for member in members:
            user = member.user
            if user.email:
                send_mail(
                    subject=f"Pengingat untuk trip '{trip.nama_trip}'",
                    message=(
                        f"Halo {user.username},\n\n"
                        f"Ini adalah pengingat H-{(trip.tanggal_berangkat - today).days} "
                        f"untuk trip anda ke {trip.tujuan.nama} pada {trip.tanggal_berangkat}\n\n"
                        "Salam hangat,\nTim Tripzy"
                    ),
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[user.email],
                    fail_silently=False,
                )
                print(f"Berhasil mengirim pengingat H-{(trip.tanggal_berangkat - today).days} ke {user.email}")
            else:
                print(f"User {user.username} tidak memiliki email")
            
        reminder.is_sent = True
        reminder.save()