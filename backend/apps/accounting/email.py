from core.models import User
from accounting.models import Invoice
from mail_templated import EmailMessage

def build_first_receipt():
    user = User.objects.first()
    invoice = user.stripe_customer.get_stripe_upcoming_invoice()
    # message = EmailMessage('invoice.tpl', {'user': user, 'invoice':invoice}, 'ianorak@ianorak.com', to =['veyorokon@gmail.com'])
    # return message.send()
    data = invoice.lines.data
    return data
    