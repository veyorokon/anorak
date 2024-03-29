from datetime import date, timedelta, datetime
import calendar
import time

def get_first_day(dt, d_years=0, d_months=0):
    y, m = dt.year + d_years, dt.month + d_months
    a, m = divmod(m-1, 12)
    return date(y+a, m+1, 1)

def get_last_day(dt):
    return get_first_day(dt, 0, 1) + timedelta(-1)

def today():
    return date.today()
    
def days_left_in_month():
    day = today()
    return day - get_last_day(day)
    
def days_this_month():
    return get_last_day(today()).day
    
def get_last_day_epoch(dt):
    timestamp1 = calendar.timegm(get_last_day(dt).timetuple())
    epoch = datetime.utcfromtimestamp(timestamp1).timestamp()
    return int(epoch)

def get_first_day_next_month_epoch():
    timestamp1 = calendar.timegm(get_first_day_of_next_month().timetuple())
    epoch = datetime.utcfromtimestamp(timestamp1).timestamp()
    return int(epoch)
    
def get_last_day_of_month_epoch():
    lastDay = get_last_day(today())
    return get_last_day_epoch(lastDay)
    
def get_first_day_of_next_month(date=today()):
    return get_last_day(date) + timedelta(days=1)
    
def convert_epoch(epoch):
    date = datetime.fromtimestamp(epoch)
    return date
    
def days_in_a_month(date):
    return calendar.monthrange(date.year,date.month)[1]
    
def date_time_to_date(dateTime):
    return dateTime.strftime('%B %d, %Y')
        
def get_current_epoch():
    return int(calendar.timegm(time.gmtime()))
    