# Generated by Django 4.2.7 on 2023-11-07 17:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_raceparticipant_laptime_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='driver',
            name='podiums',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='driver',
            name='points',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
