from django.db import models
from . import driver

class Race(models.Model):
    circuit = models.CharField(max_length=50)
    date = models.DateField()
    photo = models.URLField(null=True)

    def __str__(self):
        return f"{self.circuit}"
    
class RaceParticipant(models.Model):
    driver = models.ForeignKey(driver.Driver,on_delete=models.DO_NOTHING,null=True)
    race = models.ForeignKey(Race,on_delete=models.CASCADE,null=True)
    points = models.PositiveIntegerField(default=0)
    position = models.SmallIntegerField()
    lapTime = models.CharField(max_length=10)
    qualifyLapTime = models.CharField(max_length=10)
    trainLapTime = models.CharField(max_length=10) 