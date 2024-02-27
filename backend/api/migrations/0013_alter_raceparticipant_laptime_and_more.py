# Generated by Django 4.2.7 on 2024-02-27 19:21

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_rename_colour_team_color'),
    ]

    operations = [
        migrations.AlterField(
            model_name='raceparticipant',
            name='lapTime',
            field=models.CharField(max_length=10, validators=[django.core.validators.RegexValidator('[0-9]{2}:?[0-9]{2}.[0-9]{4}')]),
        ),
        migrations.AlterField(
            model_name='raceparticipant',
            name='qualifyLapTime',
            field=models.CharField(max_length=10, validators=[django.core.validators.RegexValidator('[0-9]{2}:?[0-9]{2}.[0-9]{4}')]),
        ),
        migrations.AlterField(
            model_name='raceparticipant',
            name='trainLapTime',
            field=models.CharField(max_length=10, validators=[django.core.validators.RegexValidator('[0-9]{2}:?[0-9]{2}.[0-9]{4}')]),
        ),
    ]