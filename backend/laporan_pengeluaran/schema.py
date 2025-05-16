import graphene
from graphene_django import DjangoObjectType
from graphql_jwt.decorators import login_required
from trip.models import RencanaPerjalanan, Trip

from .models import LaporanPengeluaran


class LaporanPengeluaranType(DjangoObjectType):
    class Meta:
        model = LaporanPengeluaran
        fields = "__all__"


class Query(graphene.ObjectType):
    all_laporan_pengeluaran = graphene.List(LaporanPengeluaranType)

    @login_required
    def resolve_all_laporan_pengeluaran(self, info):
        return LaporanPengeluaran.objects.all()


class CreateLaporanPengeluaran(graphene.Mutation):
    class Arguments:
        trip_id = graphene.ID(required=True)
        rencana_id = graphene.ID(required=True)

    laporan = graphene.Field(LaporanPengeluaranType)

    @login_required
    def mutate(self, info, trip_id, rencana_id):
        trip = Trip.objects.get(pk=trip_id)
        rencana = RencanaPerjalanan.objects.get(pk=rencana_id)

        total_biaya = rencana.estimasi_biaya

        if trip.jumlah_orang <= 0:
            raise Exception("Jumlah tidak bisa 0")

        biaya_per_orang = round(total_biaya / trip.jumlah_orang)

        laporan = LaporanPengeluaran.objects.create(
            trip=trip,
            rencana=rencana,
            total_biaya=total_biaya,
            biaya_per_orang=biaya_per_orang,
        )

        return CreateLaporanPengeluaran(laporan=laporan)


class Mutation(graphene.ObjectType):
    create_laporan_pengeluaran = CreateLaporanPengeluaran.Field()
