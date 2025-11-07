from djongo import models

class Team(models.Model):
    _id = models.ObjectIdField(primary_key=True, default=None)
    name = models.CharField(max_length=100, unique=True)
    class Meta:
        db_table = 'teams'

class User(models.Model):
    _id = models.ObjectIdField(primary_key=True, default=None)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    team = models.EmbeddedField(model_container=Team)
    class Meta:
        db_table = 'users'

class Activity(models.Model):
    _id = models.ObjectIdField(primary_key=True, default=None)
    user = models.EmbeddedField(model_container=User)
    type = models.CharField(max_length=100)
    duration = models.IntegerField()  # minutes
    calories = models.IntegerField()
    class Meta:
        db_table = 'activities'

class Leaderboard(models.Model):
    _id = models.ObjectIdField(primary_key=True, default=None)
    team = models.EmbeddedField(model_container=Team)
    points = models.IntegerField()
    class Meta:
        db_table = 'leaderboard'

class Workout(models.Model):
    _id = models.ObjectIdField(primary_key=True, default=None)
    name = models.CharField(max_length=100)
    description = models.TextField()
    difficulty = models.CharField(max_length=50)
    class Meta:
        db_table = 'workouts'
