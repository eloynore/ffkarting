from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from .serializer import DriverSerializer, TeamSerializer, RaceSerializer, RaceParticipantSerializer, RaceIncidentSerializer, UserSerializer
from .models import driver,team,race
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

@api_view(['POST'])
def login(request):
    user = get_object_or_404(User, username=request.data['username'])
    
    if not user.check_password(request.data['password']):
        return Response({"error": "Invalid user"}, status=status.HTTP_404_NOT_FOUND)
    
    token, created = Token.objects.get_or_create(user=user)
    return Response({'token': token.key, "username": user.username}, status=status.HTTP_200_OK)

# Create your views here.
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticatedOrReadOnly])
class TeamViewSet(viewsets.ModelViewSet):
    queryset = team.Team.objects.all()
    serializer_class = TeamSerializer
    @action(detail=False, methods=['get'])
    def get_leaderboard(self, request):
        team_leaderboard = []
        for item in self.queryset.iterator():
            team_drivers = []
            totalpoints_team = 0
            drivers = driver.Driver.objects.filter(team=item.pk)
            for curr_driver in drivers:
                totalpoints_driver = 0
                participations = race.RaceParticipant.objects.filter(driver=curr_driver.pk)
                if participations:
                    for participation in participations.iterator():
                        totalpoints_driver+= participation.points
                team_drivers.append({
                    'id': curr_driver.pk,
                    'name': curr_driver.name,
                    'number': curr_driver.number,
                    'points': totalpoints_driver,
                })
                totalpoints_team += totalpoints_driver
            
            team_leaderboard.append({
                'id': item.pk,
                'name': item.name,
                'color': item.color,
                'drivers': team_drivers,
                'points': totalpoints_team
            })
        leadeboard = sorted(team_leaderboard, key=lambda d: d['points'],reverse=True) 
        return Response(data={'leaderboard':leadeboard})
    
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticatedOrReadOnly])
class DriverViewSet(viewsets.ModelViewSet):
    queryset = driver.Driver.objects.all()
    serializer_class = DriverSerializer

    @action(detail=False, methods=['get'])
    def get_leaderboard(self, request):
        driver_leaderboard = []
        for item in self.queryset.iterator():
            total_points = 0
            participations = race.RaceParticipant.objects.filter(driver=item.pk)
            if participations:
                for participation in participations.iterator():
                    total_points += participation.points
            driver_leaderboard.append({
                'id': item.pk,
                'name': item.name,
                'number': item.number,
                'team': {
                    'id': item.team.pk,
                    'name':item.team.name,
                    'color': item.team.color
                },
                'points': total_points
            })
        leadeboard = sorted(driver_leaderboard, key=lambda d: d['points'],reverse=True) 
        return Response(data={'leaderboard':leadeboard})
    
    @action(detail=True, methods=['get'])
    def get_participations(self, request, pk=None):
        curr_driver = self.get_object()
        participations = race.RaceParticipant.objects.filter(driver=curr_driver.pk)
        driver_participations = []
        total_points = 0
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
                    'trainLapTime': participation.trainLapTime,
                    'fastLap':participation.fastLap,
                    'theFasto':participation.theFasto,
                    'grandChelem':participation.grandChelem,
                    'videoURL': participation.videoURL
                })
                total_points += participation.points
                
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
            'points': total_points
        }})

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticatedOrReadOnly])
class RaceViewSet(viewsets.ModelViewSet):
    queryset = race.Race.objects.all()
    serializer_class = RaceSerializer
    
    @action(detail=True, methods=['get'])
    def get_participations(self, request, pk=None):
        curr_race = self.get_object()
        participations = race.RaceParticipant.objects.filter(race=curr_race.pk)
        driver_participations = []

        if participations:
            for participation in participations.iterator():
                driver_participations.append({
                    'id':participation.pk,
                    'driver': {
                        'id': participation.driver.pk,
                        'name': participation.driver.name,
                        'number': participation.driver.number,
                        'team': {
                            'id': participation.driver.team.pk,
                            'name':participation.driver.team.name,
                            'color': participation.driver.team.color
                        }
                    },
                    'points': participation.points,
                    'position': participation.position,
                    'lapTime': participation.lapTime,
                    'qualifyLapTime': participation.qualifyLapTime,
                    'fastLap':participation.fastLap,
                    'theFasto':participation.theFasto,
                    'grandChelem':participation.grandChelem,
                    'trainLapTime': participation.trainLapTime,
                    'videoURL': participation.videoURL
                })
                
        driver_participations_result = sorted(driver_participations,  key=lambda d: d['position'])
        return Response(data={'participations':driver_participations_result,'race': {
            'id': participation.race.pk,
            'circuit': participation.race.circuit,
            'date': participation.race.date
        }})


@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticatedOrReadOnly])    
class RaceParticipantViewSet(viewsets.ModelViewSet):
    queryset = race.RaceParticipant.objects.all()
    serializer_class = RaceParticipantSerializer


@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticatedOrReadOnly])    
class RaceIncidentViewSet(viewsets.ModelViewSet):
    queryset = race.RaceIncident.objects.all()
    serializer_class = RaceIncidentSerializer