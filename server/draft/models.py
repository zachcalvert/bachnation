from django.db import models


class Season(models.Model):
    """Represents a season of the Bachelor/Bachelorette
    """
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class League(models.Model):
    """Represent a fantasy league for a given season of the Bachelor/Bachelorette
    """
    name = models.CharField(max_length=100)
    season = models.ForeignKey(Season, null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f'{self.name} - ({self.season})'


class Team(models.Model):
    """Represents a team within a given fantasy league
    """
    name = models.CharField(max_length=100)
    league = models.ForeignKey(League, on_delete=models.CASCADE, related_name='teams')
    image = models.FileField(upload_to='uploads/%Y/%m/%d/', null=True, blank=True)
    color = models.CharField(max_length=20, null=True, blank=True)
    ordering = models.IntegerField(default=0)

    class Meta:
        ordering = ['ordering']

    def __str__(self):
        return self.name

    @property
    def total_roses(self):
        return sum([c.roses for c in self.contestants.all()])


class Contestant(models.Model):
    """Represents a Contestant on a given season of the Bachelor/Bachelorette
    """
    name = models.CharField(max_length=100)
    season = models.ForeignKey(Season, on_delete=models.CASCADE)
    teams = models.ManyToManyField(Team, related_name='contestants', through='Rostership')
    image = models.FileField(upload_to='uploads/%Y/%m/%d/', null=True, blank=True)
    profession = models.CharField(max_length=100, null=True, blank=True)
    age = models.IntegerField(default=0)
    bio = models.TextField(null=True, blank=True)
    eliminated = models.BooleanField(default=False)
    roses = models.IntegerField(default=0)

    class Meta:
        ordering = ['eliminated', '-roses', 'name']

    def __str__(self):
        return self.name


class Rostership(models.Model):
    contestant = models.ForeignKey(Contestant, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)


class Draft(models.Model):
    """Represents a fantasy draft for a given league
    """
    name = models.CharField(max_length=100)
    league = models.ForeignKey(League, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class DraftPick(models.Model):
    draft = models.ForeignKey(Draft, null=True, on_delete=models.SET_NULL, related_name='picks')
    contestant = models.ForeignKey(Contestant, null=True, on_delete=models.SET_NULL)
    team = models.ForeignKey(Team, null=True, on_delete=models.SET_NULL)
    pick = models.IntegerField(default=0)

    class Meta:
        ordering = ['pick']

    def __str__(self):
        return f'{self.pick}: {self.contestant.name} ({self.team.name})'

