# Generated by Django 4.2.7 on 2023-11-09 10:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_driver_podiums_driver_points'),
    ]

    operations = [
        migrations.AddField(
            model_name='team',
            name='points',
            field=models.PositiveIntegerField(default=0),
        ),
    ]