import graphene
from graphene_django.types import DjangoObjectType
from .models import Diskon

class DiskonType(DjangoObjectType):
    class Meta:
        model = Diskon

class DiskonQuery(graphene.ObjectType):
    all_diskon = graphene.List(DiskonType)

    def resolve_all_diskon(root, info):
        return Diskon.objects.all()
