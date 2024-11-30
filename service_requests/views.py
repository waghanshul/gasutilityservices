from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import ServiceRequest, Customer
from .serializers import ServiceRequestSerializer, CustomerSerializer

class CustomerViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = CustomerSerializer

    def get_queryset(self):
        return Customer.objects.filter(user=self.request.user)

class ServiceRequestViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ServiceRequestSerializer

    def get_queryset(self):
        return ServiceRequest.objects.filter(customer__user=self.request.user)

    def perform_create(self, serializer):
        customer = self.request.user.customer
        serializer.save(customer=customer)
