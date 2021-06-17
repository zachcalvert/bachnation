from rest_framework import serializers

from draft import models


class ContestantSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Contestant
        fields = ['id', 'name', 'age', 'image', 'profession', 'eliminated']


class ContestantDetailSerializer(serializers.ModelSerializer):
    pick = serializers.SerializerMethodField('get_pick')
    team_id = serializers.SerializerMethodField('team_id')
    team_name = serializers.SerializerMethodField('team_name')

    class Meta:
        model = models.Contestant
        fields = ['id', 'name', 'age', 'image', 'profession', 'eliminated', 'pick', 'team_id', 'team_name']

    def get_pick(self, obj):
        return models.DraftPick.objects.filter(contestant=obj).first().pick

    def get_team_id(self, obj):
        return models.Team.objects.filter(contestant=obj).first().id

    def get_team_name(self, obj):
        return models.Team.objects.filter(contestant=obj).first().name


class TeamSerializer(serializers.ModelSerializer):
    contestants = ContestantSerializer(many=True, read_only=True)

    class Meta:
        model = models.Team
        fields = ['id', 'name', 'image', 'contestants']


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
