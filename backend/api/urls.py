from django.urls import path, include, re_path
from rest_framework import routers
from api import views

router = routers.DefaultRouter()
router.register(r'drivers',views.DriverViewSet)
router.register(r'teams',views.TeamViewSet)
router.register(r'races',views.RaceViewSet)
router.register(r'participant',views.ParticipantViewSet)
router.register(r'incident',views.IncidentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    re_path('login', views.login)
]