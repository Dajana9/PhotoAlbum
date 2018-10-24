from django.urls import path
from . import views

app_name = 'photomanager'

urlpatterns = [
    # ex: /photomanager/
    path('', views.index, name='index'),
    
    path('create_album/', views.create_album, name='create_album')

]