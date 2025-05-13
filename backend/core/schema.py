import graphene
from user.schema import Query as UserQuery
from user.schema import Mutation as UserMutation
from trip.schema import Query as TripQuery
from trip.schema import Mutation as TripMutation
from trip_member.schema import Query as TripMemberQuery
from trip_member.schema import Mutation as TripMemberMutation
from diskon.schema import DiskonQuery  

class Query(UserQuery, DiskonQuery, TripQuery, TripMemberQuery, graphene.ObjectType):  
    pass

class Mutation(UserMutation, TripMutation, TripMemberMutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)