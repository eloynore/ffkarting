# Generated by Django 4.2.7 on 2024-05-28 14:02

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Driver',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('number', models.PositiveSmallIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Race',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('circuit', models.CharField(max_length=50)),
                ('date', models.DateField()),
                ('photo', models.URLField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('color', models.CharField(max_length=6, null=True)),
                ('logo', models.ImageField(blank=True, null=True, upload_to='team_logos/')),
            ],
        ),
        migrations.CreateModel(
            name='Participant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('points', models.PositiveIntegerField(default=0)),
                ('position', models.SmallIntegerField()),
                ('lapTime', models.CharField(blank=True, max_length=10, validators=[django.core.validators.RegexValidator('[0-9]{2}:?[0-9]{2}.[0-9]{4}')])),
                ('qualifyLapTime', models.CharField(blank=True, max_length=10, validators=[django.core.validators.RegexValidator('[0-9]{2}:?[0-9]{2}.[0-9]{4}')])),
                ('trainLapTime', models.CharField(blank=True, max_length=10, validators=[django.core.validators.RegexValidator('[0-9]{2}:?[0-9]{2}.[0-9]{4}')])),
                ('avgTime', models.CharField(blank=True, max_length=10, validators=[django.core.validators.RegexValidator('[0-9]{2}:?[0-9]{2}.[0-9]{4}')])),
                ('qualifyAvgTime', models.CharField(blank=True, max_length=10, validators=[django.core.validators.RegexValidator('[0-9]{2}:?[0-9]{2}.[0-9]{4}')])),
                ('trainAvgTime', models.CharField(blank=True, max_length=10, validators=[django.core.validators.RegexValidator('[0-9]{2}:?[0-9]{2}.[0-9]{4}')])),
                ('fastLap', models.BooleanField(default=False)),
                ('theFasto', models.BooleanField(default=False)),
                ('grandChelem', models.BooleanField(default=False)),
                ('videoURL', models.URLField(null=True)),
                ('driver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.driver')),
                ('race', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.race')),
            ],
        ),
        migrations.CreateModel(
            name='Incident',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField()),
                ('videoURL', models.URLField(null=True)),
                ('resolution', models.TextField()),
                ('drivers', models.ManyToManyField(to='api.driver')),
                ('race', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.race')),
            ],
        ),
        migrations.AddField(
            model_name='driver',
            name='team',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.team'),
        ),
        migrations.AddConstraint(
            model_name='participant',
            constraint=models.UniqueConstraint(fields=('driver', 'race'), name='unique_participant_driver_race'),
        ),
    ]
