# Generated by Django 4.2.7 on 2023-11-07 15:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_race_raceparticipant'),
    ]

    operations = [
        migrations.AddField(
            model_name='race',
            name='photo',
            field=models.URLField(null=True),
        ),
        migrations.AlterField(
            model_name='driver',
            name='team',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.team'),
        ),
        migrations.AlterField(
            model_name='raceparticipant',
            name='driver',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='api.driver'),
        ),
        migrations.AlterField(
            model_name='raceparticipant',
            name='race',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.race'),
        ),
    ]
