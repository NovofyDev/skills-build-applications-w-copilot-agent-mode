from django.test import TestCase
from .models import Team, User, Activity, Leaderboard, Workout

class ModelTests(TestCase):
    def test_team_creation(self):
        team = Team.objects.create(name='Test Team')
        self.assertEqual(team.name, 'Test Team')

    def test_user_creation(self):
        team = Team.objects.create(name='Test Team')
        user = User.objects.create(name='Test User', email='test@example.com', team={'_id': team._id, 'name': team.name})
        self.assertEqual(user.name, 'Test User')
        self.assertEqual(user.team['name'], 'Test Team')

    def test_activity_creation(self):
        team = Team.objects.create(name='Test Team')
        user = User.objects.create(name='Test User', email='test@example.com', team={'_id': team._id, 'name': team.name})
        activity = Activity.objects.create(user={'_id': user._id, 'name': user.name, 'email': user.email, 'team': user.team}, type='Test', duration=10, calories=100)
        self.assertEqual(activity.type, 'Test')
        self.assertEqual(activity.duration, 10)
        self.assertEqual(activity.calories, 100)

    def test_leaderboard_creation(self):
        team = Team.objects.create(name='Test Team')
        leaderboard = Leaderboard.objects.create(team={'_id': team._id, 'name': team.name}, points=123)
        self.assertEqual(leaderboard.team['name'], 'Test Team')
        self.assertEqual(leaderboard.points, 123)

    def test_workout_creation(self):
        workout = Workout.objects.create(name='Test Workout', description='Desc', difficulty='Easy')
        self.assertEqual(workout.name, 'Test Workout')
        self.assertEqual(workout.difficulty, 'Easy')
