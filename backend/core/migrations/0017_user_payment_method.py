# Generated by Django 2.1.1 on 2018-11-18 04:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0016_remove_user_can_view_mature_content'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='payment_method',
            field=models.CharField(blank=True, max_length=32, null=True),
        ),
    ]