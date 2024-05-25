from rest_framework import serializers
from .models import driver,team,race
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','username','password']

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model=team.Team
        fields='__all__'

class DriverSerializer(serializers.ModelSerializer):
    class Meta:
        model=driver.Driver
        fields='__all__'

class RaceSerializer(serializers.ModelSerializer):
    class Meta:
        model=race.Race
        fields='__all__'
        
class RaceParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model=race.RaceParticipant
        fields='__all__'

class RaceIncidentSerializer(serializers.ModelSerializer):
    class Meta:
        model=race.RaceIncident
        fields='__all__'