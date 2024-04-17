from . import views
from django.urls import path

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('create-post/', views.create_post, name='create-post'),
    path('get-posts/', views.get_posts, name='get-posts'),
    path('create-product', views.create_product, name='create-product'),
    path('get-products', views.get_products, name='get-products'),
    path('create-listing', views.create_listing, name='create-listing'),
    path('get-listings', views.get_listings, name='get-listings'),
    path('create-group', views.create_group, name='create-group'),
    path('get-users', views.get_users, name='get-users'),
    path('get-groups', views.get_groups, name='get-groups'),
    path('post-message', views.post_message, name='post-message'),
    path('get-messages', views.get_messages, name='get-messages'),
    path('update-user', views.update_user, name='update_user'),
    path('user-activity/', views.user_activity, name='user_activity'),
    path('save-feedback', views.save_feedback, name='save_feedback'),
]
