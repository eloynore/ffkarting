# Generated by Django 4.2.7 on 2023-11-07 14:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_remove_driver_team_remove_team_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='driver',
            name='team',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.team'),
        ),
    ]
