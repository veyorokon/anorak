# Generated by Django 2.1.1 on 2019-03-27 00:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django_enumfield.db.fields
import encrypted_model_fields.fields
import subscription.enum


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='SubscriptionAccount',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', django_enumfield.db.fields.EnumField(default=0, editable=False, enum=subscription.enum.SubscriptionAccountType)),
                ('username', encrypted_model_fields.fields.EncryptedCharField(blank=True, null=True)),
                ('password', encrypted_model_fields.fields.EncryptedCharField(blank=True, null=True)),
                ('status_account', django_enumfield.db.fields.EnumField(default=20, enum=subscription.enum.SubscriptionAccountStatus)),
                ('date_created', models.DateTimeField(editable=False)),
                ('date_modified', models.DateTimeField(editable=False)),
                ('date_canceled', models.DateTimeField(blank=True, editable=False, null=True)),
                ('responsible_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='subscription_accounts', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'Subscription_Accounts',
            },
        ),
        migrations.CreateModel(
            name='SubscriptionMember',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status_membership', django_enumfield.db.fields.EnumField(default=40, enum=subscription.enum.MembershipStatus)),
                ('date_created', models.DateTimeField(editable=False)),
                ('date_modified', models.DateTimeField(editable=False)),
                ('date_canceled', models.DateTimeField(blank=True, editable=False, null=True)),
                ('stripe_subscription_item_id', models.CharField(max_length=32, unique=True)),
                ('subscription_account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='subscribers', to='subscription.SubscriptionAccount')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='subscription_memberships', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'Subscriptions',
            },
        ),
        migrations.CreateModel(
            name='SubscriptionPlan',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.FloatField(default=0.0)),
                ('is_active', models.BooleanField(default=False)),
                ('date_canceled', models.DateTimeField(blank=True, editable=False, null=True)),
                ('billing_frequency', django_enumfield.db.fields.EnumField(default=20, enum=subscription.enum.PlanBillingFrequency)),
                ('maximum_size', models.IntegerField(blank=True, default=None, null=True)),
                ('stripe_plan_id', models.CharField(max_length=32)),
            ],
            options={
                'db_table': 'Subscription_Plans',
                'ordering': ['maximum_size'],
            },
        ),
        migrations.CreateModel(
            name='SubscriptionService',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128, unique=True)),
                ('type', django_enumfield.db.fields.EnumField(default=0, enum=subscription.enum.ServiceType)),
                ('free_trial_days', models.IntegerField(default=0)),
                ('url_home', models.CharField(max_length=128, null=True)),
                ('url_terms_of_service', models.CharField(max_length=128, null=True)),
                ('is_username_email', models.BooleanField(default=False)),
                ('is_available', models.BooleanField(default=False)),
                ('stripe_product_id', models.CharField(max_length=32)),
            ],
            options={
                'db_table': 'Subscription_Services',
            },
        ),
        migrations.AddField(
            model_name='subscriptionplan',
            name='service',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pricing_plans', to='subscription.SubscriptionService'),
        ),
        migrations.AddField(
            model_name='subscriptionaccount',
            name='subscription_plan',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='subscription_accounts', to='subscription.SubscriptionPlan'),
        ),
        migrations.AddField(
            model_name='subscriptionaccount',
            name='subscription_service',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='subscription_accounts', to='subscription.SubscriptionService'),
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
            name='subscriptionplan',
            unique_together={('service', 'amount', 'maximum_size')},
        ),
        migrations.AlterUniqueTogether(
            name='subscriptionaccount',
            unique_together={('responsible_user', 'subscription_service', 'subscription_plan')},
        ),
    ]
