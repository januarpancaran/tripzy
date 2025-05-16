import graphene
from graphene_django import DjangoObjectType
from .models import Pengingat
from graphql_jwt.decorators import login_required
from trip_member.models import TripMember


class PengingatType(DjangoObjectType):
    class Meta:
        model = Pengingat
        fields = "__all__"


class Query(graphene.ObjectType):
    all_pengingat = graphene.List(PengingatType)
    pengingat_by_trip = graphene.List(PengingatType, trip_id=graphene.ID(required=True))

    @login_required
    def resolve_all_pengingat(self, info):
        user = info.context.user
        trip_ids = TripMember.objects.filter(user=user).values_list("trip_id", flat=True)
        return Pengingat.objects.filter(trip_id__in=trip_ids)

    @login_required
    def resolve_pengingat_by_trip(self, info, trip_id):
        user = info.context.user
        is_member = TripMember.objects.filter(user=user, trip_id=trip_id).exists()
        if not is_member:
            raise Exception("Anda bukan member di trip ini.")
        return Pengingat.objects.filter(trip_id=trip_id)
