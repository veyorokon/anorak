# Generated by Django 2.1.1 on 2019-03-22 01:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django_enumfield.db.fields
import encrypted_model_fields.fields
import subscription.enum


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('subscription', '0007_auto_20190322_0054'),
    ]

    operations = [
        migrations.CreateModel(
            name='SubscriptionAccount',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', django_enumfield.db.fields.EnumField(default=0, enum=subscription.enum.SubscriptionAccountType)),
                ('username', encrypted_model_fields.fields.EncryptedCharField(blank=True, null=True)),
                ('password', encrypted_model_fields.fields.EncryptedCharField(blank=True, null=True)),
                ('status_account', django_enumfield.db.fields.EnumField(default=20, enum=subscription.enum.SubscriptionAccountStatus)),
                ('is_connected_account', models.BooleanField(default=False, editable=False)),
                ('date_created', models.DateTimeField(editable=False)),
                ('date_modified', models.DateTimeField(editable=False)),
                ('date_canceled', models.DateTimeField(blank=True, editable=False, null=True)),
                ('responsible_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='subscription_accounts', to=settings.AUTH_USER_MODEL)),
                ('subscription_plan', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='subscription_accounts', to='subscription.SubscriptionPlan')),
                ('subscription_service', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='subscription_accounts', to='subscription.SubscriptionService')),
            ],
            options={
                'db_table': 'Subscription_Accounts',
            },
        ),
        migrations.CreateModel(
            name='ConnectAccount',
            fields=[
            ],
            options={
                'proxy': True,
                'indexes': [],
            },
            bases=('subscription.subscriptionaccount',),
        ),
        migrations.CreateModel(
            name='CreateAccount',
            fields=[
            ],
            options={
                'proxy': True,
                'indexes': [],
            },
            bases=('subscription.subscriptionaccount',),
        ),
        migrations.AlterUniqueTogether(
            name='subscriptionaccount',
            unique_together={('responsible_user', 'subscription_service', 'subscription_plan')},
        ),
    ]