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
    CLIENT = 1 # If the user generated this process request
    
# The status of requests
class ManagementRequestStatus(enum.Enum):
    FAILED = 0 # If the request has been processed but with issues
    PROCESSING = 1 # If the request has yet to be processed
    COMPLETE = 2 # If the request was successfully processed

# The status of requests
class ManagementRequestAction(enum.Enum):
    CANCEL_ACCOUNT = 0 
    CHANGE_PASSWORD = 1 
    CONNECT_ACCOUNT = 2 
    CREATE_ACCOUNT = 3 