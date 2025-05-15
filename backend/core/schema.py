import graphene
from user.schema import Query as UserQuery
from user.schema import Mutation as UserMutation
from trip.schema import Query as TripQuery
from trip.schema import Mutation as TripMutation
from trip_member.schema import Query as TripMemberQuery
from trip_member.schema import Mutation as TripMemberMutation
from laporan_pengeluaran.schema import Query as LaporanPengeluaranQuery
from laporan_pengeluaran.schema import Mutation as LaporanPengeluaranMutation
from diskon.schema import DiskonQuery  

class Query(UserQuery, DiskonQuery, TripQuery, TripMemberQuery, LaporanPengeluaranQuery, graphene.ObjectType):  
    pass

class Mutation(UserMutation, TripMutation, TripMemberMutation, LaporanPengeluaranMutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)