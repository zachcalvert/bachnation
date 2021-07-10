from rest_framework import serializers

from draft import models


class ContestantSerializer(serializers.ModelSerializer):
    pick = serializers.SerializerMethodField('get_pick')
    roses = serializers.SerializerMethodField()
    team_id = serializers.SerializerMethodField('get_team_id')
    team_name = serializers.SerializerMethodField('get_team_name')
    team_color = serializers.SerializerMethodField('get_team_color')

    class Meta:
        model = models.Contestant
        fields = ['id', 'name', 'age', 'image', 'profession', 'eliminated', 'pick', 'team_id', 'team_name', 'roses', 'bio', 'team_color']

    def get_pick(self, obj):
        return models.DraftPick.objects.filter(contestant=obj).first().pick

    def get_roses(self, obj):
        return ['🌹'*obj.roses]

    def get_team_id(self, obj):
        return obj.teams.first().id

    def get_team_name(self, obj):
        return obj.teams.first().name

    def get_team_color(self, obj):
        return obj.teams.first().color


class TeamSerializer(serializers.ModelSerializer):
    contestants = ContestantSerializer(many=True, read_only=True)
    total_roses = serializers.SerializerMethodField('get_total_roses')

    class Meta:
        model = models.Team
        fields = ['id', 'name', 'image', 'contestants', 'total_roses', 'color']

    def get_total_roses(self, obj):
        return obj.total_roses


class DraftPickSerializer(serializers.ModelSerializer):
    contestant = ContestantSerializer()
    team = TeamSerializer()

    class Meta:
        model = models.DraftPick
        fields = ['id', 'team', 'contestant', 'pick']


class DraftSerializer(serializers.ModelSerializer):
    picks = DraftPickSerializer(many=True, read_only=True)

    class Meta:
        model = models.Draft
        fields = ['league', 'picks', ]


class LeagueSerializer(serializers.ModelSerializer):
    teams = TeamSerializer(read_only=True, many=True)

    class Meta:
        model = models.League
        fields = ['name', 'teams']
