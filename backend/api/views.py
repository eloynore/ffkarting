from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializer import DriverSerializer, TeamSerializer, RaceSerializer, RaceParticipantSerializer
from .models import driver,team,race
# Create your views here.
class TeamViewSet(viewsets.ModelViewSet):
    queryset = team.Team.objects.all()
    serializer_class = TeamSerializer

class DriverViewSet(viewsets.ModelViewSet):
    queryset = driver.Driver.objects.all()
    serializer_class = DriverSerializer
    
    @action(detail=False, methods=['get'])
    def get_leaderboard(self, request, pk=None):
        driver_leaderboard = []
        for item in self.queryset.iterator():
            totalpoints = 0
            participations = race.RaceParticipant.objects.filter(driver=item.pk)
            if participations:
                for participation in participations.iterator():
                    totalpoints += participation.points
            driver_leaderboard.append({
                'id': item.pk,
                'name': item.name,
                'number': item.number,
                'team': item.team.name,
                'points': totalpoints
            })
        leadeboard = sorted(driver_leaderboard, key=lambda d: d['points'],reverse=True) 
        return Response(data={'leaderboard':leadeboard})    
class RaceViewSet(viewsets.ModelViewSet):
    queryset = race.Race.objects.all()
    serializer_class = RaceSerializer
    
class RaceParticipantViewSet(viewsets.ModelViewSet):
    queryset = race.RaceParticipant.objects.all()
    serializer_class = RaceParticipantSerializer