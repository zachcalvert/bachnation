# Generated by Django 3.1.12 on 2021-06-17 19:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('draft', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='team',
            name='league',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='teams', to='draft.league'),
        ),
    ]
