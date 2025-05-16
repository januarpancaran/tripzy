import graphene
from diskon.schema import DiskonQuery
from laporan_pengeluaran.schema import Mutation as LaporanPengeluaranMutation
from laporan_pengeluaran.schema import Query as LaporanPengeluaranQuery
from pengingat.schema import Query as PengingatQuery
from trip.schema import Mutation as TripMutation
from trip.schema import Query as TripQuery
from trip_member.schema import Mutation as TripMemberMutation
from trip_member.schema import Query as TripMemberQuery
from user.schema import Mutation as UserMutation
from user.schema import Query as UserQuery


class Query(
    UserQuery,
    DiskonQuery,
    TripQuery,
    TripMemberQuery,
    LaporanPengeluaranQuery,
    PengingatQuery,
    graphene.ObjectType,
):
    pass


class Mutation(
    UserMutation,
    TripMutation,
    TripMemberMutation,
    LaporanPengeluaranMutation,
    graphene.ObjectType,
):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
