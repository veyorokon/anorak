from rest_framework import serializers
from . models import *

class StripePlanSerializer(serializers.ModelSerializer):

    class Meta:
        model = StripePlan
        fields = '__all__'
        


class SquadMemberSerializer(serializers.BaseSerializer):
    #https://www.django-rest-framework.org/api-guide/serializers/#overriding-serialization-and-deserialization-behavior

    def to_representation(self, obj):
        return {
            obj.id:{
                'price': obj.price,
                'service': obj.service,
                'status':obj.status,
                'plan_name':obj.plan_name,
                'current_size':obj.current_size,
                'maximum_size':obj.maximum_size
            }
        }

    class Meta:
        model = SquadMember
        fields='__all__'
        
class SquadSerializer(serializers.ModelSerializer):

    class Meta:
        model = Squad
        fields = '__all__'

