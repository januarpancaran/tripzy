import graphene
from graphene_django import DjangoObjectType
from graphql_jwt.decorators import login_required
from trip.models import Trip
from user.models import Users

from .models import TripMember


class TripMemberType(DjangoObjectType):
    class Meta:
        model = TripMember
        fields = "__all__"


class Query(graphene.ObjectType):
    all_trip_members = graphene.List(TripMemberType)

    @login_required
    def resolve_all_trip_members(root, info):
        user = info.context.user
        return TripMember.objects.filter(user=user)


class AddTripMember(graphene.Mutation):
    class Arguments:
        trip_id = graphene.ID(required=True)
        username = graphene.String(required=True)

    trip_member = graphene.Field(TripMemberType)

    @login_required
    def mutate(self, info, trip_id, username):
        try:
            user_to_invite = Users.objects.get(username=username)
            trip = Trip.objects.get(pk=trip_id)

            if trip.created_by != info.context.user:
                raise Exception("Hanya pembuat trip yang bisa mengundang member")

            trip_member, created = TripMember.objects.get_or_create(
                trip=trip,
                user=user_to_invite,
                defaults={"status": "invited"},
            )

            return AddTripMember(trip_member=trip_member)
        except Users.DoesNotExist:
            raise Exception("User tidak ditemukan")
        except Trip.DoesNotExist:
            raise Exception("Trip tidak ditemukan")


class UpdateTripMemberStatus(graphene.Mutation):
    class Arguments:
        trip_id = graphene.ID(required=True)
        status = graphene.String(required=True)

    trip_member = graphene.Field(TripMemberType)

    @login_required
    def mutate(self, info, trip_id, status):
        user = info.context.user

        if status not in ["joined", "declined"]:
            raise Exception('Status harus "joined" atau "declined"')

        try:
            trip = Trip.objects.get(pk=trip_id)
            trip_member = TripMember.objects.get(trip=trip, user=user)

            trip_member.status = status
            trip_member.save()

            return UpdateTripMemberStatus(trip_member=trip_member)
        except Trip.DoesNotExist:
            raise Exception("Trip tidak ditemukan")
        except TripMember.DoesNotExist:
            raise Exception("Kamu belum diundang ke trip ini")


class Mutation(graphene.ObjectType):
    add_trip_member = AddTripMember.Field()
    update_trip_member_status = UpdateTripMemberStatus.Field()
