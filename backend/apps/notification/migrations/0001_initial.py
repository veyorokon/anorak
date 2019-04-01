# Generated by Django 2.1.1 on 2019-03-27 00:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('djstripe', '0003_auto_20181117_2328_squashed_0004_auto_20190227_2114'),
    ]

    operations = [
        migrations.CreateModel(
            name='EmailReceiptNotification',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('processed', models.BooleanField(default=False)),
                ('date_created', models.DateTimeField(editable=False)),
                ('date_modified', models.DateTimeField(editable=False)),
                ('date_notified', models.DateTimeField(blank=True, editable=False, null=True)),
                ('stripe_subscription_item_id', models.CharField(max_length=32, null=True)),
                ('recipient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='notifications', to=settings.AUTH_USER_MODEL)),
                ('trigger_event', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='notifications', to='djstripe.Event')),
            ],
            options={
                'db_table': 'Email_Notifications',
            },
        ),
        migrations.AlterUniqueTogether(
            name='emailreceiptnotification',
            unique_together={('recipient',)},
        ),
    ]
