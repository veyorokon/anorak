# Generated by Django 2.1.1 on 2019-03-27 02:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notification', '0002_auto_20190327_0237'),
    ]

    operations = [
        migrations.AddField(
            model_name='emailreceiptnotification',
            name='stripe_invoice_item_id',
            field=models.CharField(max_length=32, null=True),
        ),
    ]
