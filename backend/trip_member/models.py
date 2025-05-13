from django.db import models
from user.models import Users
from trip.models import Trip

class TripMember(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name="members")
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=[
        ("invited", "Invited"),
        ("joined", "Joined"),
        ("declined", "Declined"),
    ], default="invited")
    invited_at = models.DateTimeField(auto_now_add=True)
    accepted_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        unique_together  = ("trip", "user")

    def __str__(self):
        return f"{self.user.username} in {self.trip.nama_trip} ({self.status})"