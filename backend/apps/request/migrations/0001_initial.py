# Generated by Django 2.1.1 on 2019-02-20 01:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django_enumfield.db.fields
import request.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('subscription', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ManagementRequest',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('originator', django_enumfield.db.fields.EnumField(default=1, enum=request.models.ManagementRequestOriginator)),
                ('date_created', models.DateTimeField(editable=False)),
                ('date_processed', models.DateTimeField(editable=False)),
                ('status', django_enumfield.db.fields.EnumField(default=1, enum=request.models.ManagementRequestStatus)),
                ('requested_action', django_enumfield.db.fields.EnumField(default=3, enum=request.models.ManagementRequestAction)),
                ('processed_notes', models.CharField(blank=True, max_length=128, null=True)),
                ('processed_by', models.ForeignKey(editable=False, on_delete=django.db.models.deletion.CASCADE, related_name='management_requests_processed', to=settings.AUTH_USER_MODEL)),
                ('subscription_account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='management_requests', to='subscription.SubscriptionAccount')),
                ('subscription_member', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='management_requests', to='subscription.SubscriptionMember')),
            ],
        ),
    ]
