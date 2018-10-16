from rest_framework import serializers
from . models import *

class DashboardElementserializer(serializers.ModelSerializer):

    class Meta:
        model = SquadDashboardElement
        fields = '__all__'

