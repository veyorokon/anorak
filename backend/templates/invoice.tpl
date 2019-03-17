{% extends "mail_templated/base.tpl" %}
{% load staticfiles %}

{% block subject %}
Your iAnorak {{data.service}} Subscription Order
{% endblock %}


{% block html %}
<html>
<head>
    <meta charset="utf-8">
    <title>A simple, clean, and responsive HTML invoice template</title>
    
    <style>
    .invoice-box {
        max-width: 800px;
        margin: auto;
        padding: 30px;
        border: 1px solid #eee;
        box-shadow: 0 0 10px rgba(0, 0, 0, .15);
        font-size: 16px;
        line-height: 24px;
        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
        color: #555;
    }
    
    .invoice-box table {
        width: 100%;
        line-height: inherit;
        text-align: left;
    }
    
    .invoice-box table td {
        padding: 5px;
        vertical-align: top;
    }
    
    .invoice-box table tr td:nth-child(2) {
        text-align: right;
    }
    
    .invoice-box table tr.top table td {
        padding-bottom: 20px;
    }
    
    .invoice-box table tr.top table td.title {
        font-size: 45px;
        line-height: 45px;
        color: #333;
    }
    
    .invoice-box table tr.information table td {
        padding-bottom: 40px;
    }
    
    .invoice-box table tr.heading td {
        background: #eee;
        border-bottom: 1px solid #ddd;
        font-weight: bold;
    }
    
    .invoice-box table tr.details td {
        padding-bottom: 20px;
    }
    
    .invoice-box table tr.item td{
        border-bottom: 1px solid #eee;
    }
    
    .invoice-box table tr.item.last td {
        border-bottom: none;
    }
    
    .invoice-box table tr.total td:nth-child(2) {
        border-top: 2px solid #eee;
        font-weight: bold;
    }
    
    @media only screen and (max-width: 600px) {
        .invoice-box table tr.top table td {
            width: 100%;
            display: block;
            text-align: center;
        }
        
        .invoice-box table tr.information table td {
            width: 100%;
            display: block;
            text-align: center;
        }
    }
    
    /** RTL **/
    .rtl {
        direction: rtl;
        font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
    }
    
    .rtl table {
        text-align: right;
    }
    
    .rtl table tr td:nth-child(2) {
        text-align: left;
    }
        
    @font-face {
        font-family: 'Lombok';
        src: url('{% static 'font/lombok.oft' %}');
        src: local('{% static 'font/lombok.oft' %}');
      }
      
      .title{
          font-family: 'Lombok', Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
      }
    </style>
</head>

<body>
    <div class="invoice-box">
        <table cellpadding="0" cellspacing="0">
            <tr class="top">
                <td colspan="2">
                    <table>
                        <tr>
                            <td class="title">
                                Anorak
                            </td>
                            
                            <td>
                                Invoice #: {{data.invoice_number}}<br>
                                Subscription Starts: {{data.date_start}}<br>
                                Subscription Ends: {{data.date_end}}<br>
                                Renews: {{data.date_renew}}<br><br>
                                -------------<br>
                                Billed On: {{data.date_billing}}
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            
            <tr class="information">
                <td colspan="2">
                    <table>
                        <tr>
                            <td>
                                {{ user.stripe_customer.line_1 }}<br>
                                    {% if user.stripe_customer.line_2 %}
                                       {{ user.stripe_customer.line_2 }}<br>
                                    {% endif %}
                                {{ user.stripe_customer.city }}, {{ user.stripe_customer.state }}<br>
                            </td>    
                            <td>
                                {{ user.first_name }} {{ user.last_name }}<br>
                                {{ user.email }}
                            </td>
                                                    
                        </tr>
                    </table>
                </td>
            </tr>
            
            <tr class="heading">
                <td>
                    Payment Method
                </td>
                
                <td>
                    Card #
                </td>
            </tr>
            
            <tr class="details">
                <td>
                    Card Ending
                </td>
                
                <td>
                    {{ user.stripe_customer.last_four }}<br>
                </td>
            </tr>
            
            <tr class="heading">
                <td>
                    Item
                </td>
                
                <td>
                    Price
                </td>
            </tr>
            
            {% for item in data.items %}
                <tr class="item">
                    <td>
                        {{item.description}}
                    </td>
                    
                    <td>
                        ${{item.price}}
                    </td>
                </tr>
            {% endfor %}
            
                        
            <tr class="item last">
                <td>
                    {{data.lastItem.description}}
                </td>
                
                <td>
                    ${{data.lastItem.price}}
                </td>
            </tr>
            
            <tr class="total">
                <td></td>
                
                <td>
                   Total: ${{data.total}}
                </td>
            </tr>
        </table>
        <p>
            This amount does not include the Anorak management fee calculated as: 3% + 0.50 cents of your monthly total up to a maximum charge of $5.00. On your billing date ({{data.date_billing}}), you will receive a finalized invoice with all subscriptions used and the calculated Anorak fee.
        </p>
    </div>
</body>
</html>

{% endblock %}