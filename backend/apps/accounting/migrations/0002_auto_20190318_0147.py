# Generated by Django 2.1.1 on 2019-03-18 01:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounting', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='usertax',
            old_name='state_sales_tax',
            new_name='state',
        ),
        migrations.AlterField(
            model_name='usertax',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='tax', to=settings.AUTH_USER_MODEL),
        ),
    ]