from django.db import models

# Create your models here.
class Team(models.Model):
    name = models.CharField(max_length=50)
    def __str__(self):
        return f"{self.name}"

class Driver(models.Model):
    name = models.CharField(max_length=50)
    number = models.PositiveSmallIntegerField()
    team = models.ForeignKey(Team,on_delete=models.CASCADE,null=True)
    def __str__(self):
        return f"{self.name} #{self.number} ({self.team})"
    
class Race(models.Model):
    circuit = models.CharField(max_length=50)
    date = models.DateField()
    photo = models.URLField(null=True)
    def __str__(self):
        return f"{self.circuit}"
    
class RaceParticipant(models.Model):
    driver = models.ForeignKey(Driver,on_delete=models.DO_NOTHING,null=True)
    race = models.ForeignKey(Race,on_delete=models.CASCADE,null=True)
    position = models.SmallIntegerField()
    lapTime = models.DurationField()
    qualifyLapTime = models.DurationField()
    trainLapTime = models.DurationField() 
    