from rest_framework import serializers
from . models import *

class StripePlanSerializer(serializers.ModelSerializer):

    class Meta:
        model = StripePlan
        fields = '__all__'
        


class SquadMemberSerializer(serializers.BaseSerializer):
    #https://www.django-rest-framework.org/api-guide/serializers/#overriding-serialization-and-deserialization-behavior
    
    def to_internal_value(self, data):
        id = data.get('pk')
        price = data.get('price')
        service = data.get('service')
        status = data.get('status')

        # Return the validated values. This will be available as
        # the `.validated_data` property.
        return {
            'id': int(id),
            'price': price,
            'service':service,
            'status':status
        }

    def to_representation(self, obj):
        return {
            obj.id:{
                'price': obj.price,
                'service': obj.service,
                'status':obj.status
            }
        }

    class Meta:
        model = SquadMember
        fields='__all__'
        
class SquadSerializer(serializers.ModelSerializer):

    class Meta:
        model = Squad
        fields = '__all__'

