# Generated by Django 2.1.1 on 2018-11-24 02:15

from django.db import migrations, models
import django_enumfield.db.fields
import subscription_api.models


class Migration(migrations.Migration):

    dependencies = [
        ('subscription_api', '0020_auto_20181123_1719'),
    ]

    operations = [
        migrations.AddField(
            model_name='squad',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='squadmember',
            name='status',
            field=django_enumfield.db.fields.EnumField(default=3, enum=subscription_api.models.SquadMemberStatus),
        ),
    ]
