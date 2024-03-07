from django.urls import path, include
from rest_framework import routers
from api import views

router = routers.DefaultRouter()
router.register(r'drivers',views.DriverViewSet)
router.register(r'teams',views.TeamViewSet)
router.register(r'race',views.RaceViewSet)
router.register(r'raceparticipant',views.RaceParticipantViewSet)
router.register(r'raceincident',views.RaceIncidentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]