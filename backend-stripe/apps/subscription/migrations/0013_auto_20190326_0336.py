# Generated by Django 2.1.1 on 2019-03-26 03:36

from django.db import migrations
import django_enumfield.db.fields
import subscription.enum


class Migration(migrations.Migration):

    dependencies = [
        ('subscription', '0012_auto_20190325_0554'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subscriptionaccount',
            name='type',
            field=django_enumfield.db.fields.EnumField(default=0, editable=False, enum=subscription.enum.SubscriptionAccountType),
        ),
    ]