# Generated by Django 2.1.1 on 2018-10-19 01:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20181018_1427'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='session_token',
        ),
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=254, null=True, verbose_name='email address'),
        ),
    ]
