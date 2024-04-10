"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path,include
from . import views

from .views import register,index
from backend.views import index,register,login1,insertuser,extlogin,newpage,user_login,save_credentials
from backend.views import user_prof,user_vault
urlpatterns = [
    
    path('admin/',admin.site.urls),
    
    path ("",index, name ="index"),

    path('register/', register, name='register'),
    path('login1.html', login1, name ='login1'),
    path('insertuser/', insertuser, name ='insertuser'),
    path('extlogin/',extlogin, name = 'extlogin' ),
    path('newpage/',newpage, name = 'newpage' ),
    path('login1/', user_login, name='user_login'),
    #path('generate_password/', generate_password, name='generate_password'),
    #for extension
    path('api/login/', views.login, name='login'),
    path('save_credentials/', save_credentials, name='save_credentials'),
    path('user_prof/', user_prof, name='user_prof'),
    path('user_vault/', user_vault, name='user_vault'),
]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
