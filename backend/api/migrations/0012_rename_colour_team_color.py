# Generated by Django 4.2.7 on 2024-01-31 10:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_team_colour'),
    ]

    operations = [
        migrations.RenameField(
            model_name='team',
            old_name='colour',
            new_name='color',
        ),
    ]
