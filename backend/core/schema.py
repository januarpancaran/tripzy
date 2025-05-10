import graphene
from user.schema import Query as UserQuery
from user.schema import Mutation as UserMutation

class Query(UserQuery, graphene.ObjectType):
    pass

class Mutation(UserMutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)