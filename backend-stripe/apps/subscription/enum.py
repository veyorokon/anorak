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

# Type of service
class ServiceType(enum.Enum):
    STREAMING = 0
    BOX = 10
    MEMBERSHIP = 20
        
# Frequency of subscription billing
class PlanBillingFrequency(enum.Enum):
    DAY = 0
    WEEK = 10
    MONTH = 20
    

# Status for the subscription account
class SubscriptionAccountStatus(enum.Enum):
    TERMINATED = 0
    CANCELED = 10
    PENDING = 20
    PENDING_CREATE = 29
    PENDING_CONNECT = 30 #Admin needs to first verify
    PENDING_CONFIRM_CONNECT = 35
    ACTIVE = 90
    CONNECTED = 91
    
    _transitions = {
        CONNECTED: (
            PENDING,
            PENDING_CONFIRM_CONNECT,
        ),
        ACTIVE: (
            PENDING,
            PENDING_CREATE,
        ),
        PENDING_CONFIRM_CONNECT: (
            PENDING,
            PENDING_CONNECT,
        )
    }
    
    
# Type of subscription account
class SubscriptionAccountType(enum.Enum):
    CREATE = 0
    CONNECT = 10
    

# Status for the subscription membership
class MembershipStatus(enum.Enum):
    PAYMENT_FAILED = 0 
    KICKED = 10 
    CANCELED = 20 
    INVITED = 30
    PENDING = 40
    UPDATING = 50
    ACTIVE = 90 