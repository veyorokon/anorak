from datetime import date, timedelta, datetime
import calendar


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
    
def get_first_day_of_next_month():
    return get_last_day(today()) + timedelta(days=1)
    
def calculate_anorak_fee(amount=0.0):
    if amount==0.0:
        return 0
    fee = round((amount * 0.03 + 0.50),2)
    if fee > 5.00:
        return 5.00
    return fee
