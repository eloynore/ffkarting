from rest_framework import viewsets
from .serializer import DriverSerializer, TeamSerializer, RaceSerializer, RaceParticipantSerializer
from .models import Driver, Team, Race, RaceParticipant
# Create your views here.
class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class DriverViewSet(viewsets.ModelViewSet):
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer
    
class RaceViewSet(viewsets.ModelViewSet):
    queryset = Race.objects.all()
    serializer_class = RaceSerializer
    
class RaceParticipantViewSet(viewsets.ModelViewSet):
    queryset = RaceParticipant.objects.all()
    serializer_class = RaceParticipantSerializer