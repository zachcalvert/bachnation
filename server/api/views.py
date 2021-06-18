import datetime
import json
import re
import requests
from functools import wraps

from django.contrib.auth.models import User, Group
from django.contrib.auth import authenticate
from django.db.models import QuerySet
from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, pagination, permissions, viewsets
from rest_framework.decorators import action, api_view
from rest_framework.response import Response

from api import serializers
from draft.models import Contestant, Draft, DraftPick, League, Team


class LeagueViewSet(viewsets.ModelViewSet):
    queryset = League.objects.all()
    serializer_class = serializers.LeagueSerializer


class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = serializers.TeamSerializer


class ContestantViewSet(viewsets.ModelViewSet):
    queryset = Contestant.objects.all()
    serializer_class = serializers.ContestantSerializer

    def retrieve(self, request, *args, **kwargs):
        self.serializer_class = serializers.ContestantDetailSerializer
        return super(ContestantViewSet, self).retrieve(request, *args, **kwargs)


class DraftViewSet(viewsets.ModelViewSet):
    queryset = Draft.objects.all()
    serializer_class = serializers.DraftSerializer


class DraftPickViewSet(viewsets.ModelViewSet):
    queryset = DraftPick.objects.all()
    serializer_class = serializers.DraftPickSerializer

    def create(self, request, *args, **kwargs):
        validated_data = request.data
        draftee = Contestant.objects.get(id=validated_data['draftee_id'])
        drafter = Team.objects.get(id=validated_data['drafter_id'])
        draft = Draft.objects.get(id=validated_data['draft_id'])

        DraftPick.objects.create(**{
            "draftee": draftee,
            "drafter": drafter,
            "draft": draft
        })
        draftee.save()
        return Response(status=201)
