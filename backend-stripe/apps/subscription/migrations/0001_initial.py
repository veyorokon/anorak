# Generated by Django 2.1.1 on 2019-03-21 21:34

from django.db import migrations, models
import django_enumfield.db.fields
import subscription.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SubscriptionService',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
                ('type', django_enumfield.db.fields.EnumField(default=0, enum=subscription.models.ServiceType)),
                ('free_trial_days', models.IntegerField(default=0)),
                ('url_home', models.CharField(max_length=128, null=True)),
                ('url_terms_of_service', models.CharField(max_length=128, null=True)),
                ('is_username_email', models.BooleanField(default=False)),
                ('date_created', models.DateTimeField(editable=False)),
                ('date_modified', models.DateTimeField(editable=False)),
                ('is_available', models.BooleanField(default=False)),
            ],
            options={
                'db_table': 'Subscription_Services',
            },
        ),
    ]
