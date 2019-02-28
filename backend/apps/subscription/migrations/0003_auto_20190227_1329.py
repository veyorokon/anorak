# Generated by Django 2.1.1 on 2019-02-27 21:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('subscription', '0002_auto_20190222_1644'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='subscriptionpricingplan',
            options={'ordering': ['maximum_size']},
        ),
        migrations.RenameField(
            model_name='subscriptionmember',
            old_name='status_memberhip',
            new_name='status_membership',
        ),
        migrations.AlterField(
            model_name='subscriptionaccount',
            name='price_plan',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='subscription_accounts', to='subscription.SubscriptionPricingPlan'),
        ),
        migrations.AlterField(
            model_name='subscriptionaccount',
            name='service',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='subscription_accounts', to='subscription.SubscriptionService'),
        ),
    ]