from rest_framework import serializers
from .models import ServiceRequest, Customer

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'address', 'account_number']

class ServiceRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceRequest
        fields = ['id', 'type', 'status', 'description', 'created_at', 
                 'updated_at', 'attachments', 'customer']
