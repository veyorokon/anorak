# Generated by Django 2.1.1 on 2018-11-12 22:54

from django.db import migrations
import encrypted_model_fields.fields


class Migration(migrations.Migration):

    dependencies = [
        ('subscription_api', '0014_auto_20181112_1412'),
    ]

    operations = [
        migrations.AddField(
            model_name='squad',
            name='secret',
            field=encrypted_model_fields.fields.EncryptedCharField(null=True),
        ),
    ]
