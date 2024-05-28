from django.db import models
from django.core.validators import RegexValidator
from . import driver

validator = RegexValidator(r'[0-9]{2}:?[0-9]{2}.[0-9]{4}')

class Race(models.Model):
    circuit = models.CharField(max_length=50)
    date = models.DateField()
    photo = models.URLField(null=True)
    
    def __str__(self):
        return f"{self.circuit}"
    
class Participant(models.Model):
    driver = models.ForeignKey(driver.Driver,on_delete=models.CASCADE)
    race = models.ForeignKey(Race,on_delete=models.CASCADE)
    points = models.PositiveIntegerField(default=0)
    position = models.SmallIntegerField()
    lapTime = models.CharField(max_length=10,validators=[validator],blank=True)
    qualifyLapTime = models.CharField(max_length=10,validators=[validator],blank=True)
    trainLapTime = models.CharField(max_length=10,validators=[validator],blank=True)
    avgTime = models.CharField(max_length=10,validators=[validator],blank=True)
    qualifyAvgTime = models.CharField(max_length=10,validators=[validator],blank=True)
    trainAvgTime = models.CharField(max_length=10,validators=[validator],blank=True)
    fastLap = models.BooleanField(default=False)
    theFasto = models.BooleanField(default=False)
    grandChelem = models.BooleanField(default=False)
    videoURL = models.URLField(null=True)
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['driver', 'race'], name='unique_participant_driver_race')
        ]

    
class Incident(models.Model):
    race = models.ForeignKey(Race,on_delete=models.CASCADE,null=True)
    drivers = models.ManyToManyField(driver.Driver)
    description = models.TextField()
    videoURL = models.URLField(null=True)
    resolution = models.TextField()