# Generated by Django 2.1.1 on 2018-10-17 23:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0011_remove_user_session_token'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=254, null=True, verbose_name='email address'),
        ),
    ]
