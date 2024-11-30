from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from service_requests.views import ServiceRequestViewSet, CustomerViewSet

router = DefaultRouter()
router.register(r'service-requests', ServiceRequestViewSet, basename='service-request')
router.register(r'customers', CustomerViewSet, basename='customer')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
]
