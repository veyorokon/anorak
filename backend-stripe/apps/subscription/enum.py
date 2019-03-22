"""
Custom enum types for the subscription models
"""

##########################################################################
## Imports
##########################################################################

from django_enumfield import enum

##########################################################################
## Enum Types
##########################################################################

# Frequency of subscription billing
class ServiceType(enum.Enum):
    STREAMING = 0
    BOX = 1
    MEMBERSHIP = 2
        
# Frequency of subscription billing
class PlanBillingFrequency(enum.Enum):
    DAY = 0
    WEEK = 1
    MONTH = 2
    

# Status for the subscription account
class SubscriptionAccountStatus(enum.Enum):
    TERMINATED = 0
    CANCELED = 10
    PENDING = 20
    PENDING_CREATE = 29
    PENDING_CONNECT = 30
    PENDING_CONNECT_CONFIRM = 35
    ACTIVE = 90
    CONNECTED = 91
    
    
# Status for the subscription account
class SubscriptionAccountType(enum.Enum):
    CREATE = 0
    CONNECT = 1
    