"""
Custom enum types for the subscription models
"""

##########################################################################
## Imports
##########################################################################
from django_enumfield import enum
from enum import Enum

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
    BIMONTH = 21
    QUARTER = 25
    YEAR = 30


# Status for the subscription account
class SubscriptionAccountStatus(enum.Enum):
    REMOVED = 0
    TERMINATED = 5
    CANCELED = 10
    PENDING_CANCELLATION = 15
    PENDING = 20
    PENDING_CREATE = 29
    PENDING_CONNECT = 30
    PENDING_CONFIRM_CONNECT = 35
    ADDED = 80
    ACTIVE = 90
    CONNECTED = 91

    _transitions = {
        CONNECTED: (
            PENDING,
            PENDING_CONFIRM_CONNECT,
            PENDING_CONNECT,
        ),
        ACTIVE: (
            PENDING,
            PENDING_CREATE,
        ),
        PENDING_CONFIRM_CONNECT: (
            PENDING,
            PENDING_CONNECT,
        ),
        PENDING_CANCELLATION:(
            CONNECTED,
            ACTIVE,
            PENDING,
            PENDING_CREATE,
            PENDING_CONNECT,
            PENDING_CONFIRM_CONNECT,
        ),
        CANCELED : (
            PENDING_CANCELLATION,
        )
    }


# Status for the subscription membership
class MembershipStatus(enum.Enum):
    PAYMENT_FAILED = 0
    KICKED = 10
    CANCELED = 20
    INVITED = 30
    PENDING = 40
    UPDATING = 50
    ACTIVE = 90

    def validate(status):
        if status >= MembershipStatus.UPDATING:
            return True
        return False
