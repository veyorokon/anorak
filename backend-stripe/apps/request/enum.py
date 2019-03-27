"""
Custom enum types for the request models
"""

##########################################################################
## Imports
##########################################################################

from django_enumfield import enum

##########################################################################
## Enum Types
##########################################################################

# A request for account management
class ManagementRequestOriginator(enum.Enum):
    SERVER = 0 # If the backend generated this process request
    CLIENT = 10 # If the user generated this process request
    
# The status of requests
class ManagementRequestStatus(enum.Enum):
    FAILED = 0 # If the request has been processed but with issues
    PROCESSING = 50 # If the request has yet to be processed
    COMPLETED = 90 # If the request was successfully processed
    COMPLETED_BY_SERVER = 95

# The status of requests
class ManagementRequestAction(enum.Enum):
    CANCEL_ACCOUNT = 0
    CANCEL_MEMBER = 10  
    CHANGE_PASSWORD = 20 
    CONNECT_ACCOUNT = 80 
    CREATE_ACCOUNT = 90 