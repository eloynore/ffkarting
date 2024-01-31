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
    def get_leaderboard(self, request):
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
                'team': {
                    'id': item.team.pk,
                    'name':item.team.name,
                    'color': item.team.color
                },
                'points': totalpoints
            })
        leadeboard = sorted(driver_leaderboard, key=lambda d: d['points'],reverse=True) 
        return Response(data={'leaderboard':leadeboard})
    
    @action(detail=True, methods=['get'])
    def get_participations(self, request, pk=None):
        curr_driver = self.get_object()
        participations = race.RaceParticipant.objects.filter(driver=curr_driver.pk)
        driver_participations = []
        totalPoints = 0
        if participations:
            for participation in participations.iterator():
                driver_participations.append({
                    'id':participation.pk,
                    'race': {
                        'id': participation.race.pk,
                        'circuit': participation.race.circuit,
                        'date': participation.race.date
                    },
                    'points': participation.points,
                    'position': participation.position,
                    'lapTime': participation.lapTime,
                    'qualifyLapTime': participation.qualifyLapTime,
                    'trainLapTime': participation.trainLapTime
                })
                totalPoints += participation.points
                
        driver_participations_result = sorted(driver_participations,  key=lambda d: d['race']['date'],reverse=True)
        return Response(data={'participations':driver_participations_result,'driver':{
            'id': curr_driver.pk,
            'name': curr_driver.name,
            'number': curr_driver.number,
            'team': {
                'id': curr_driver.team.pk,
                'name':curr_driver.team.name,
                'color': curr_driver.team.color
            },
            'points': totalPoints
        }})

class RaceViewSet(viewsets.ModelViewSet):
    queryset = race.Race.objects.all()
    serializer_class = RaceSerializer
    
class RaceParticipantViewSet(viewsets.ModelViewSet):
    queryset = race.RaceParticipant.objects.all()
    serializer_class = RaceParticipantSerializer