# Generated by Django 2.1.1 on 2019-03-05 08:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('subscription', '0004_subscriptionpricingplan_stripe_plan'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subscriptionpricingplan',
            name='stripe_plan',
            field=models.CharField(max_length=32),
        ),
    ]
