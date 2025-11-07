from django.core.management.base import BaseCommand
from octofit_tracker.models import Team, User, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Delete existing data
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()
        Workout.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Convert teams to dicts for embedding
        marvel_dict = {'_id': marvel._id, 'name': marvel.name}
        dc_dict = {'_id': dc._id, 'name': dc.name}

        # Create users
        users = [
            User.objects.create(name='Spider-Man', email='spiderman@marvel.com', team=marvel_dict),
            User.objects.create(name='Iron Man', email='ironman@marvel.com', team=marvel_dict),
            User.objects.create(name='Wonder Woman', email='wonderwoman@dc.com', team=dc_dict),
            User.objects.create(name='Batman', email='batman@dc.com', team=dc_dict),
        ]

        # Convert users to dicts for embedding
        user_dicts = [
            {'_id': u._id, 'name': u.name, 'email': u.email, 'team': u.team} for u in users
        ]

        # Create activities
        Activity.objects.create(user=user_dicts[0], type='Running', duration=30, calories=300)
        Activity.objects.create(user=user_dicts[1], type='Cycling', duration=45, calories=450)
        Activity.objects.create(user=user_dicts[2], type='Swimming', duration=60, calories=600)
        Activity.objects.create(user=user_dicts[3], type='Yoga', duration=40, calories=200)

        # Create workouts
        Workout.objects.create(name='Cardio Blast', description='High intensity cardio workout', difficulty='Hard')
        Workout.objects.create(name='Strength Builder', description='Full body strength training', difficulty='Medium')

        # Create leaderboard
        Leaderboard.objects.create(team=marvel_dict, points=750)
        Leaderboard.objects.create(team=dc_dict, points=800)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data'))
