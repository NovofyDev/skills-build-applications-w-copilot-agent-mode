from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class UserModelTest(TestCase):
    def test_create_user(self):
        user = User.objects.create(name="Test Hero", email="test@hero.com", team="Marvel")
        self.assertEqual(user.name, "Test Hero")
        self.assertEqual(user.team, "Marvel")

class TeamModelTest(TestCase):
    def test_create_team(self):
        team = Team.objects.create(name="Test Team", members=["Hero1", "Hero2"])
        self.assertEqual(team.name, "Test Team")
        self.assertIn("Hero1", team.members)

class ActivityModelTest(TestCase):
    def test_create_activity(self):
        activity = Activity.objects.create(user="Test Hero", activity="Running", duration=30)
        self.assertEqual(activity.activity, "Running")

class LeaderboardModelTest(TestCase):
    def test_create_leaderboard(self):
        lb = Leaderboard.objects.create(team="Test Team", points=100)
        self.assertEqual(lb.points, 100)

class WorkoutModelTest(TestCase):
    def test_create_workout(self):
        workout = Workout.objects.create(name="Test Workout", suggested_for=["Hero1"])
        self.assertEqual(workout.name, "Test Workout")
