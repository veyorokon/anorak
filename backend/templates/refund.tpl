{% extends "mail_templated/base.tpl" %}
{% load staticfiles %}

{% block subject %}
Your Subscription Cancellation Refund
{% endblock %}


{% block html %}
<html>
<head>
    <meta charset="utf-8">
    <title>iAnorak</title>
    
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
                                Subscription Started: {{data.start_date}}<br>
                                Canceled: {{date_cancelled}}<br><br>
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
                                {{ data.address.line1 }}<br>
                                    {% if data.address.line2 %}
                                       {{ data.address.line2 }}<br>
                                    {% endif %}
                                {{ data.address.city }}, {{ data.address.state }}<br>
                            </td>    
                            <td>
                              {% if user.first_name %} {{ user.first_name }} {% endif %}
                                 {% if user.first_name %} {{ user.last_name }} {% endif %}<br>
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
                    {{ data.last4 }}<br>
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
            
          {% with data.items|last as last %}
          
          
              {% for item in data.items %}
                {% ifnotequal item.item_id|stringformat:"s" last.item_id|stringformat:"s" %}
                
                    {% if item.prorated_description %}
                      <tr class="item">
                        <td>
                            {{item.prorated_description}}
                        </td>
                        
                        <td>
                            ${{item.prorated_amount}}
                            {% if item.was_refunded %}
                              (Refund)&nbsp;
                            {% endif %}
                        </td>
                      </tr>
                    {% endif %}
                    
                    {% if item.plan_description %}
                      <tr class="item">
                        <td>
                          {{item.plan_description}}
                        </td>
                        
                        <td>
                            ${{item.plan_amount}}
                            {% if item.was_refunded %}
                              (Refund)&nbsp;
                            {% endif %}
                        </td>
                      </tr>
                    {% endif %}
                        
                  {% endifnotequal %}
              {% endfor %}
                
            
              
                {% if last.prorated_description %}
                  <tr class="item">
                    <td>
                        {{last.prorated_description}}
                    </td>
                    
                    <td>
                        ${{last.prorated_amount}}
                        {% if last.was_refunded %}
                          (Refund)&nbsp;
                        {% endif %}
                    </td>
                  </tr>
                {% endif %}
              
              <tr class="item last">
                <td>
                    {{last.plan_description}}
                </td>
                
                <td>
                    ${{last.plan_amount}}
                    {% if last.was_refunded %}
                      (Refund)&nbsp;
                    {% endif %}
                </td>
              </tr>
          {% endwith %}            
            
            
            <tr class="item last">
              <td>
                Subtotal:
              </td>
              <td>
                 ${{data.subtotal}}
              </td>
            </tr>
            <tr class="item last">
              <td>
                Tax:
              </td>
              <td>
                 ${{data.tax}}
              </td>
            </tr>
            <tr class="total last">
                <td>Refund Total: </td>                
                <td>
                   ${{data.total}}
                </td>
            </tr>
        </table>
        {% if data.has_anorak_fee is not True %}
          <p>
              This amount does not include the Anorak management fee calculated as: 3% + 0.50 cents of your monthly total up to a maximum charge of $5.00. On your billing date ({{data.billing_date}}), you will receive a finalized invoice with all subscriptions used and the calculated Anorak fee.
          </p>
        {% endif %}
    </div>
</body>
</html>
{% endblock %}