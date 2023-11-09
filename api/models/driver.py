from django.db import models
from . import team

class Driver(models.Model):
    name = models.CharField(max_length=50)
    number = models.PositiveSmallIntegerField()
    team = models.ForeignKey(team.Team,on_delete=models.CASCADE,null=True)
    
    def __str__(self):
        return f"{self.name} #{self.number} ({self.team})"