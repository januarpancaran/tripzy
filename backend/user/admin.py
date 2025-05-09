from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'username', 'nama', 'email', 'no_hp', 'role')
    search_fields = ('username', 'nama', 'email')
    list_filter = ('role', )