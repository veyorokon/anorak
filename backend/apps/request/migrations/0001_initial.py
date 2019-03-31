# Generated by Django 2.1.1 on 2019-03-27 00:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django_enumfield.db.fields
import request.enum


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('subscription', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ManagementRequest',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('originator', django_enumfield.db.fields.EnumField(default=10, enum=request.enum.ManagementRequestOriginator)),
                ('date_created', models.DateTimeField(editable=False)),
                ('date_processed', models.DateTimeField(blank=True, editable=False, null=True)),
                ('status', django_enumfield.db.fields.EnumField(default=50, enum=request.enum.ManagementRequestStatus)),
                ('requested_action', django_enumfield.db.fields.EnumField(default=90, enum=request.enum.ManagementRequestAction)),
                ('processed_notes', models.CharField(blank=True, max_length=128, null=True)),
                ('processed_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='processed_management_requests', to=settings.AUTH_USER_MODEL)),
                ('subscription_account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='management_requests', to='subscription.SubscriptionAccount')),
                ('subscription_member', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='management_requests', to='subscription.SubscriptionMember')),
            ],
        ),
    ]