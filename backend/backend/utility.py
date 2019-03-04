from datetime import date, timedelta

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