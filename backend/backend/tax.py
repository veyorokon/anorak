import taxjar
from django.conf import settings
taxClient = taxjar.Client(api_key=settings.TAX_JAR_KEY)

def tax_from_zip(zip):
    stateSalesTax = 0
    if zip:
        rates = taxClient.rates_for_location(str(zip))
        stateSalesTax = rates.state_rate
    return stateSalesTax