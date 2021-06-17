from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers

from api import views

router = routers.DefaultRouter()

router.register(r'contestants', views.ContestantViewSet)
router.register(r'drafts', views.DraftViewSet)
router.register(r'draftpicks', views.DraftPickViewSet)
router.register(r'leagues', views.LeagueViewSet)
router.register(r'teams', views.TeamViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)

admin.site.site_header = "Bach Nation Admin"
admin.site.site_title = "Bach Nation Admin Portal"
admin.site.index_title = "Bach Nation Administration"
