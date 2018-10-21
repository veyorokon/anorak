from rest_framework import serializers
from . models import *

class SquadSerializer(serializers.ModelSerializer):

    class Meta:
        model = Squad
        fields = '__all__'

