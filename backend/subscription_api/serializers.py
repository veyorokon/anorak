from rest_framework import serializers
from . models import *

class StripePlanSerializer(serializers.ModelSerializer):

    class Meta:
        model = StripePlan
        fields = '__all__'


class SquadSerializer(serializers.ModelSerializer):

    class Meta:
        model = Squad
        fields = '__all__'

