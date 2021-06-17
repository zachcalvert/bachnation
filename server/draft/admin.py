from django.contrib import admin

# Register your models here.
from draft.models import Contestant, Draft, DraftPick, League, Season, Team


def mark_as_undrafted(modeladmin, request, queryset):
    for contestant in queryset:
        contestant.drafted = False
        contestant.save()
mark_as_undrafted.short_description = 'Mark as undrafted'


def mark_as_drafted(modeladmin, request, queryset):
    for contestant in queryset:
        contestant.drafted = True
        contestant.save()
mark_as_drafted.short_description = 'Mark as drafted'


class ContestantAdmin(admin.ModelAdmin):
    list_display = ('name', 'profession', 'age',)
    search_fields = ['name', 'profession']
    actions = [mark_as_undrafted, mark_as_drafted]


admin.site.register(Contestant, ContestantAdmin)
admin.site.register(Draft)
admin.site.register(DraftPick)
admin.site.register(League)
admin.site.register(Season)
admin.site.register(Team)