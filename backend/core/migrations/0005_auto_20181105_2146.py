# Generated by Django 2.1.1 on 2018-11-06 05:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_auto_20181105_2143'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='phone_number',
            field=models.CharField(blank=True, max_length=17, null=True, unique=True),
        ),
    ]