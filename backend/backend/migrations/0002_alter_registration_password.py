# Generated by Django 5.0.1 on 2024-03-03 23:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='registration',
            name='Password',
            field=models.CharField(max_length=128),
        ),
    ]
