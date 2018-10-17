# Generated by Django 2.1.1 on 2018-10-16 17:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('verification_api', '0002_phoneverificationcode'),
        ('core', '0002_user_session_token'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='phone_verification_code',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user', to='verification_api.PhoneVerificationCode'),
        ),
    ]
