from django.urls import path,include
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register(r'api', views.PostViewSet)
# (? router.register(r'api/post', views.post_create))
urlpatterns = router.urls
urlpatterns = [
     path('api/create', views.post_create,name='create'),
     path('api/delete/<id>', views.delete_view,name='delete'),
     path('api/show/<id>', views.show_view),
     path('', include(router.urls))

]