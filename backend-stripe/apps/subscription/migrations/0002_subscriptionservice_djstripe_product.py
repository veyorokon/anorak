# Generated by Django 2.1.1 on 2019-03-21 21:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('djstripe', '0003_auto_20181117_2328_squashed_0004_auto_20190227_2114'),
        ('subscription', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='subscriptionservice',
            name='djstripe_product',
            field=models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, to='djstripe.Product'),
            preserve_default=False,
        ),
    ]