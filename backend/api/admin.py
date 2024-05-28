from django.contrib import admin
from .models import driver,team,race

# Register your models here.
admin.site.register([driver.Driver,team.Team,race.Race,race.Participant,race.Incident])
