

class Error(Exception):
    pass
    
class StatusTransitionError(Error):
    def __init__(self):
        #self.status = status
        pass
        
    def __str__(str):
        return 'Invalid transition'