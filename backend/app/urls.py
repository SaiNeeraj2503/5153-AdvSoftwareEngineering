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
]
