from rest_framework import serializers
from .models import Driver, Team, Race, RaceParticipant

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model=Team
        fields='__all__'

class DriverSerializer(serializers.ModelSerializer):
    class Meta:
        model=Driver
        fields='__all__'

class RaceSerializer(serializers.ModelSerializer):
    class Meta:
        model=Race
        fields='__all__'
        
class RaceParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model=RaceParticipant
        fields='__all__'