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
        
class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model=race.Participant
        fields='__all__'

class IncidentSerializer(serializers.ModelSerializer):
    class Meta:
        model=race.Incident
        fields='__all__'