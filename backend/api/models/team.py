from django.db import models

# Create your models here.
class Team(models.Model):
    name = models.CharField(max_length=50)
    color = models.CharField(max_length=6, null=True)
    logo = models.ImageField(upload_to='team_logos/', null=True, blank=True)

    def __str__(self):
        return f"{self.name}"