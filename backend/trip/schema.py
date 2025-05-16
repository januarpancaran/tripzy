from datetime import timedelta

import graphene
from django.db.models import Q
from django.utils import timezone
from graphene_django import DjangoObjectType
from graphql_jwt.decorators import login_required
from pengingat.models import Pengingat
from trip_member.models import TripMember
from trip_member.schema import TripMemberType

from .models import Hotel, Kendaraan, Kota, RencanaPerjalanan, Trip


# Queries
class KotaType(DjangoObjectType):
    class Meta:
        model = Kota
        fields = "__all__"


class HotelType(DjangoObjectType):
    class Meta:
        model = Hotel
        fields = "__all__"


class KendaraanType(DjangoObjectType):
    class Meta:
        model = Kendaraan
        fields = "__all__"


class TripType(DjangoObjectType):
    members = graphene.List(TripMemberType)
    member_status = graphene.String()

    class Meta:
        model = Trip
        fields = "__all__"

    def resolve_members(self, info):
        return self.members.select_related("user").all()

    def resolve_member_status(self, info):
        return "creator" if self.created_by == info.context.user else "member"


class RencanaPerjalananType(DjangoObjectType):
    class Meta:
        model = RencanaPerjalanan
        fields = "__all__"


class Query(graphene.ObjectType):
    all_kota = graphene.List(KotaType)
    all_hotel = graphene.List(HotelType)
    all_kendaraan = graphene.List(KendaraanType)
    all_trip = graphene.List(TripType)
    all_rencana_perjalanan = graphene.List(RencanaPerjalananType)

    def resolve_all_kota(root, info):
        return Kota.objects.all()

    def resolve_all_hotel(root, info):
        return Hotel.objects.all()

    def resolve_all_kendaraan(root, info):
        return Kendaraan.objects.all()

    @login_required
    def resolve_all_trip(root, info):
        user = info.context.user
        return Trip.objects.filter(
            Q(created_by=user) | Q(members__user=user, members__status="joined")
        ).distinct()

    @login_required
    def resolve_all_rencana_perjalanan(root, info):
        user = info.context.user
        return RencanaPerjalanan.objects.filter(
            Q(trip__created_by=user)
            | Q(trip__members__user=user, trip__members__status="joined")
        ).distinct()


# Mutations
class CreateKota(graphene.Mutation):
    class Arguments:
        nama = graphene.String(required=True)
        provinsi = graphene.String()
        negara = graphene.String()

    kota = graphene.Field(KotaType)

    def mutate(self, info, nama, provinsi=None, negara="Indonesia"):
        kota = Kota(nama=nama, provinsi=provinsi or "", negara=negara)
        kota.save()

        return CreateKota(kota=kota)


class CreateHotel(graphene.Mutation):
    class Arguments:
        nama = graphene.String(required=True)
        alamat = graphene.String()
        harga_per_malam = graphene.Int(required=True)

    hotel = graphene.Field(HotelType)

    def mutate(self, info, nama, harga_per_malam, alamat=None):
        hotel = Hotel(nama=nama, harga_per_malam=harga_per_malam, alamat=alamat or "")
        hotel.save()

        return CreateHotel(hotel=hotel)


class CreateKendaraan(graphene.Mutation):
    class Arguments:
        nama = graphene.String(required=True)
        tipe = graphene.String()
        harga = graphene.Int(required=True)

    kendaraan = graphene.Field(KendaraanType)

    def mutate(self, info, nama, harga, tipe=None):
        kendaraan = Kendaraan(nama=nama, harga=harga, tipe=tipe or "")
        kendaraan.save()

        return CreateKendaraan(kendaraan=kendaraan)


class CreateTrip(graphene.Mutation):
    class Arguments:
        nama_trip = graphene.String(required=True)
        asal_id = graphene.ID(required=True)
        tujuan_id = graphene.ID(required=True)
        jumlah_orang = graphene.Int(required=True)
        lama_perjalanan = graphene.Int(required=True)
        tanggal_berangkat = graphene.types.datetime.Date(required=True)

    trip = graphene.Field(TripType)

    @login_required
    def mutate(
        self,
        info,
        nama_trip,
        asal_id,
        tujuan_id,
        jumlah_orang,
        lama_perjalanan,
        tanggal_berangkat,
    ):
        user = info.context.user
        asal = Kota.objects.get(pk=asal_id)
        tujuan = Kota.objects.get(pk=tujuan_id)

        trip = Trip.objects.create(
            created_by=user,
            nama_trip=nama_trip,
            asal=asal,
            tujuan=tujuan,
            jumlah_orang=jumlah_orang,
            lama_perjalanan=lama_perjalanan,
            tanggal_berangkat=tanggal_berangkat,
        )

        TripMember.objects.create(
            trip=trip,
            user=user,
            status="joined",
        )

        for d in [7, 3, 1]:
            reminder_date = tanggal_berangkat - timedelta(days=d)
            if reminder_date >= timezone.localdate():
                Pengingat.objects.create(
                    trip=trip,
                    waktu_pengingat=reminder_date,
                    is_sent=False,
                )

        return CreateTrip(trip=trip)


class CreateRencanaPerjalanan(graphene.Mutation):
    class Arguments:
        trip_id = graphene.ID(required=True)
        hotel_id = graphene.ID()
        jumlah_kamar = graphene.Int(required=False)
        kendaraan_id = graphene.ID()

    rencana = graphene.Field(RencanaPerjalananType)

    @login_required
    def mutate(self, info, trip_id, jumlah_kamar=1, hotel_id=None, kendaraan_id=None):
        trip = Trip.objects.get(pk=trip_id)
        hotel = Hotel.objects.get(pk=hotel_id) if hotel_id else None
        kendaraan = Kendaraan.objects.get(pk=kendaraan_id) if kendaraan_id else None

        biaya_hotel = 0
        if hotel:
            biaya_hotel = hotel.harga_per_malam * trip.lama_perjalanan * jumlah_kamar

        biaya_kendaraan = 0
        if kendaraan:
            biaya_kendaraan = kendaraan.harga * trip.jumlah_orang

        seasonal_multiplier = (
            1.2 if trip.tanggal_berangkat.month in [6, 7, 12, 1] else 1
        )

        total_estimasi = (biaya_hotel + biaya_kendaraan) * seasonal_multiplier

        rencana = RencanaPerjalanan.objects.create(
            trip=trip,
            hotel=hotel,
            jumlah_kamar=jumlah_kamar,
            kendaraan=kendaraan,
            estimasi_biaya=round(total_estimasi),
        )

        return CreateRencanaPerjalanan(rencana=rencana)


class Mutation(graphene.ObjectType):
    create_kota = CreateKota.Field()
    create_hotel = CreateHotel.Field()
    create_kendaraan = CreateKendaraan.Field()
    create_trip = CreateTrip.Field()
    create_rencana_perjalanan = CreateRencanaPerjalanan.Field()
