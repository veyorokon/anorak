# Generated by Django 2.1.1 on 2018-12-13 05:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('subscription_api', '0007_auto_20181211_1705'),
    ]

    operations = [
        migrations.AddField(
            model_name='squad',
            name='image',
            field=models.URLField(blank=True, null=True),
        ),
    ]