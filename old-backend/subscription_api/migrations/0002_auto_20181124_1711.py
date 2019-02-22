# Generated by Django 2.1.1 on 2018-11-25 01:11

from django.db import migrations
import django_enumfield.db.fields
import subscription_api.models


class Migration(migrations.Migration):

    dependencies = [
        ('subscription_api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='squadmember',
            name='status',
            field=django_enumfield.db.fields.EnumField(default=5, enum=subscription_api.models.SquadMemberStatus),
        ),
    ]