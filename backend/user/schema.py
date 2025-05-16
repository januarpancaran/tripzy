import graphene
import graphql_jwt
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.core.exceptions import ValidationError
from django.core.mail import send_mail
from django.core.validators import validate_email
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from graphene_django.types import DjangoObjectType
from graphql import GraphQLError
from graphql_jwt.decorators import login_required
from graphql_jwt.mixins import ObtainJSONWebTokenMixin
from graphql_jwt.settings import jwt_settings
from graphql_jwt.shortcuts import get_token

from .models import Users


class UserType(DjangoObjectType):
    class Meta:
        model = Users
        fields = (
            "id",
            "username",
            "email",
            "password",
            "first_name",
            "last_name",
            "no_hp",
            "jenis_kelamin",
            "tanggal_lahir",
            "kota_tinggal",
        )


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
        no_hp = graphene.String(required=False)
        jenis_kelamin = graphene.String(required=False)
        tanggal_lahir = graphene.Date(required=False)
        kota_tinggal = graphene.String(required=False)

    def mutate(
        self,
        info,
        username,
        email,
        password,
        first_name,
        last_name="",
        no_hp=None,
        jenis_kelamin=None,
        tanggal_lahir=None,
        kota_tinggal=None,
    ):
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

        user = User(
            username=username,
            email=email,
            first_name=first_name,
            last_name=last_name,
            no_hp=no_hp,
            jenis_kelamin=jenis_kelamin,
            tanggal_lahir=tanggal_lahir,
            kota_tinggal=kota_tinggal,
        )

        user.set_password(password)
        user.save()

        return RegisterUser(user=user)


class UpdateProfile(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        no_hp = graphene.String()
        jenis_kelamin = graphene.String()
        tanggal_lahir = graphene.String()
        kota_tinggal = graphene.String()

    @login_required
    def mutate(
        self,
        info,
        no_hp=None,
        jenis_kelamin=None,
        tanggal_lahir=None,
        kota_tinggal=None,
    ):
        user = info.context.user

        if no_hp is not None:
            if not no_hp.isdigit() or not (10 <= len(no_hp) <= 15):
                raise GraphQLError("Nomor telepon harus minimal 10 angka")
            else:
                user.no_hp = no_hp
        if jenis_kelamin is not None:
            user.jenis_kelamin = jenis_kelamin
        if tanggal_lahir is not None:
            user.tanggal_lahir = tanggal_lahir
        if kota_tinggal is not None:
            user.kota_tinggal = kota_tinggal

        user.save()
        return UpdateProfile(user=user)


class ChangePassword(graphene.Mutation):
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    class Arguments:
        old_password = graphene.String(required=True)
        new_password = graphene.String(required=True)

    @login_required
    def mutate(self, info, old_password, new_password):
        user = info.context.user

        if not user.check_password(old_password):
            return ChangePassword(success=False, errors=["Password lama salah"])

        if len(new_password) < 8:
            return ChangePassword(
                success=False, errors=["Password baru minimal berisi 8 karakter"]
            )

        user.set_password(new_password)
        user.save()

        return ChangePassword(success=True, errors=[])


class CustomObtainJSONWebToken(graphene.Mutation, ObtainJSONWebTokenMixin):
    token = graphene.String()
    payload = graphene.JSONString()
    refresh_expires_in = graphene.Int()

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)

    @classmethod
    def mutate(cls, root, info, username, password):
        User = get_user_model()

        try:
            validate_email(username)
            user = User.objects.filter(email=username).first()
        except ValidationError:
            user = User.objects.filter(username=username).first()

        if not user:
            raise GraphQLError("Akun tidak ditemukan")

        if not user.check_password(password):
            raise GraphQLError("Password salah")

        token = get_token(user)
        payload = jwt_settings.JWT_PAYLOAD_HANDLER(user)

        return CustomObtainJSONWebToken(
            token=token,
            payload=payload,
            refresh_expires_in=(
                jwt_settings.JWT_REFRESH_EXPIRATION_DELTA.total_seconds()
                if jwt_settings.JWT_ALLOW_REFRESH
                else None
            ),
        )


class RequestPasswordReset(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        email = graphene.String(required=True)

    def mutate(self, info, email):
        User = get_user_model()
        user = User.objects.filter(email=email).first()

        if not user:
            raise GraphQLError("Email tidak ditemukan")

        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        reset_link = f"http://localhost:3000/reset-password?uid={uid}&token={token}"

        send_mail(
            "Reset Password",
            f"Klik link berikut untuk reset password: {reset_link}",
            "noreply@tripzy.com",
            [user.email],
        )

        return RequestPasswordReset(success=True)


class ResetPassword(graphene.Mutation):
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    class Arguments:
        uid = graphene.String(required=True)
        token = graphene.String(required=True)
        new_password = graphene.String(required=True)

    def mutate(self, info, uid, token, new_password):
        try:
            uid = urlsafe_base64_decode(uid).decode()
            user = get_user_model().objects.get(pk=uid)
        except Exception:
            return ResetPassword(success=False, errors=["Link tidak valid"])

        if not default_token_generator.check_token(user, token):
            return ResetPassword(
                success=False, errors=["Token tidak valid atau expired"]
            )

        if len(new_password) < 8:
            return ResetPassword(
                success=False, errors=["Password baru minimal 8 karakter"]
            )

        user.set_password(new_password)
        user.save()
        return ResetPassword(success=True, errors=[])


class Mutation(graphene.ObjectType):
    register_user = RegisterUser.Field()
    update_profile = UpdateProfile.Field()
    change_password = ChangePassword.Field()
    request_password_reset = RequestPasswordReset.Field()
    reset_password = ResetPassword.Field()
    token_auth = CustomObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
