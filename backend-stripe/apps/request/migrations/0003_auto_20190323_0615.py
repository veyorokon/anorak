# Generated by Django 2.1.1 on 2019-03-23 06:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('request', '0002_auto_20190323_0615'),
    ]

    operations = [
        migrations.AlterField(
            model_name='managementrequest',
            name='subscription_account',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='management_requests', to='subscription.SubscriptionAccount'),
        ),
        migrations.AlterField(
            model_name='managementrequest',
            name='subscription_member',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='management_requests', to='subscription.SubscriptionMember'),
        ),
    ]
