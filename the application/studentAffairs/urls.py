
from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    #path('login/', include('login.urls', namespace='login')),
    path("", include('login.urls')),
    path('admin/', admin.site.urls),
]
