# Generated by Django 2.1.1 on 2018-10-18 19:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(default=None, max_length=254, null=True, verbose_name='email address'),
        ),
    ]
