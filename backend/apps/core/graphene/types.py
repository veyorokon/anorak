from graphene_django.types import DjangoObjectType
from core.models import * 


class _UserType(DjangoObjectType):
    class Meta:
        model = User
        exclude_fields = ['is_superuser', 'is_staff']
    
    def resolver(self, info):
        user = info.context.user
        if user == self or user.is_staff:
            return user.__dict__[info.field_name]
        return None