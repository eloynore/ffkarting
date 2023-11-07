from django.contrib import admin
from .models import Driver,Team,Race,RaceParticipant
# Register your models here.
admin.site.register([Driver,Team,Race,RaceParticipant])
