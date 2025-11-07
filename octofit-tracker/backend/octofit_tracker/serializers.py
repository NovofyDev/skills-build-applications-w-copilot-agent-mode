from rest_framework import serializers
from .models import Team, User, Activity, Leaderboard, Workout

class TeamSerializer(serializers.Serializer):
    _id = serializers.CharField(read_only=True)
    name = serializers.CharField(max_length=100)

class UserSerializer(serializers.Serializer):
    _id = serializers.CharField(read_only=True)
    name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    team = TeamSerializer()

class ActivitySerializer(serializers.Serializer):
    _id = serializers.CharField(read_only=True)
    user = UserSerializer()
    type = serializers.CharField(max_length=100)
    duration = serializers.IntegerField()
    calories = serializers.IntegerField()

class LeaderboardSerializer(serializers.Serializer):
    _id = serializers.CharField(read_only=True)
    team = TeamSerializer()
    points = serializers.IntegerField()

class WorkoutSerializer(serializers.Serializer):
    _id = serializers.CharField(read_only=True)
    name = serializers.CharField(max_length=100)
    description = serializers.CharField()
    difficulty = serializers.CharField(max_length=50)
