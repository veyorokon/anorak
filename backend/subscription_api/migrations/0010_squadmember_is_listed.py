# Generated by Django 2.1.1 on 2018-12-15 01:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('subscription_api', '0009_auto_20181214_1643'),
    ]

    operations = [
        migrations.AddField(
            model_name='squadmember',
            name='is_listed',
            field=models.BooleanField(default=True),
        ),
    ]
