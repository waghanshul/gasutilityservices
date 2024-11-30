INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'service_requests',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    # ... other middleware
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # React development server
]

# service_requests/models.py
from django.db import models
from django.contrib.auth.models import User

class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    address = models.TextField()
    account_number = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return f"{self.user.get_full_name()} - {self.account_number}"

class ServiceRequest(models.Model):
    TYPE_CHOICES = [
        ('gas_leak', 'Gas Leak'),
        ('billing', 'Billing'),
        ('connection', 'Connection'),
        ('maintenance', 'Maintenance'),
        ('other', 'Other'),
    ]
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
        ('cancelled', 'Cancelled'),
    ]

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    attachments = models.FileField(upload_to='service_requests/', null=True, blank=True)

    def __str__(self):
        return f"{self.customer.account_number} - {self.type} - {self.status}"
