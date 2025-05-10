import graphene
import graphql_jwt
from graphql import GraphQLError
from django.contrib.auth import get_user_model
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from graphene_django.types import DjangoObjectType
from graphql_jwt.decorators import login_required
from .models import Users

class UserType(DjangoObjectType):
    class Meta:
        model = Users
        fields = ("id", "username", "email", "password", "first_name", "last_name", "no_hp")

class Query(graphene.ObjectType):
    me = graphene.Field(UserType)

    @login_required
    def resolve_me(self, info):
        return info.context.user
    
class RegisterUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String(required=True)
        email = graphene.String(required=True)
        password = graphene.String(required=True)
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=False)
        no_hp = graphene.String(required=True)

    def mutate(self, info, username, email, password, no_hp, first_name, last_name=""):
        User = get_user_model()

        if User.objects.filter(username=username).exists():
            raise GraphQLError("Username sudah digunakan")

        if User.objects.filter(email=email).exists():
            raise GraphQLError("Email sudah digunakan")

        try:
            validate_email(email)
        except ValidationError:
            raise GraphQLError("Format email invalid")

        if len(password) < 8:
            raise GraphQLError("Password minimal berisi 8 karakter")

        if not no_hp.isdigit() or not (10 <= len(no_hp) <= 15):
            raise GraphQLError("Nomor telepon harus minimal 10 angka")

        user = User(
            username=username,
            email=email,
            first_name=first_name,
            last_name=last_name,
            no_hp=no_hp,
        )

        user.set_password(password)
        user.save()

        return RegisterUser(user=user)

class Mutation(graphene.ObjectType):
    register_user = RegisterUser.Field()
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
