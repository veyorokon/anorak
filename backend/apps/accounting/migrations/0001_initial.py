# Generated by Django 2.1.1 on 2019-02-20 01:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('subscription', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='AccountReceivable',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('balance_current', models.FloatField(default=0.0)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='account_receivable', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'Account_Receivables',
            },
        ),
        migrations.CreateModel(
            name='Invoice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_sent', models.DateTimeField(editable=False)),
                ('date_for', models.DateTimeField(editable=False)),
                ('date_paid', models.DateTimeField(editable=False)),
                ('is_void', models.BooleanField(default=False)),
                ('account_receivable', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='invoices', to='accounting.AccountReceivable')),
            ],
            options={
                'db_table': 'Invoices',
            },
        ),
        migrations.CreateModel(
            name='InvoiceItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.FloatField()),
                ('is_voided', models.BooleanField(default=False)),
                ('is_free_trial', models.BooleanField(default=False)),
                ('invoice', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='items', to='accounting.Invoice')),
                ('subscription_member', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='invoice_items', to='subscription.SubscriptionMember')),
            ],
            options={
                'db_table': 'Invoice_Items',
            },
        ),
    ]
