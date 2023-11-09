from rest_framework import viewsets
from .serializer import DriverSerializer, TeamSerializer, RaceSerializer, RaceParticipantSerializer
from .models import driver,team,race
# Create your views here.
class TeamViewSet(viewsets.ModelViewSet):
    queryset = team.Team.objects.all()
    serializer_class = TeamSerializer

class DriverViewSet(viewsets.ModelViewSet):
    queryset = driver.Driver.objects.all()
    serializer_class = DriverSerializer
    
class RaceViewSet(viewsets.ModelViewSet):
    queryset = race.Race.objects.all()
    serializer_class = RaceSerializer
    
class RaceParticipantViewSet(viewsets.ModelViewSet):
    queryset = race.RaceParticipant.objects.all()
    serializer_class = RaceParticipantSerializer