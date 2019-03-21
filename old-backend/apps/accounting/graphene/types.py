from graphene_django.types import DjangoObjectType
from accounting.models import *
from graphene_django.registry import Registry

class InvoiceType(DjangoObjectType):
    class Meta:
        model = Invoice
        exclude_fields = []