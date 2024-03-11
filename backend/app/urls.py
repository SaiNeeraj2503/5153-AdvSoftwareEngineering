from . import views
from django.urls import path

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('create-post/', views.create_post, name='create-post'),
    path('get-posts/', views.get_posts, name='get-posts'),
]
