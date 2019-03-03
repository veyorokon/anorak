import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import { renderToStaticMarkup } from 'react-dom/server';
import Invoice from "components/material-dashboard/Invoice/Invoice";
import Card from "components/material-dashboard/Card/Card";

const invoice = {
    createdDate: '2018-03-16',
    dueDate: '2018-04-16',
    paymentMethod: 'PayPal',
    id: 'ABCD-1234',
    description: 'Post-show cravings',
    items: [
      {
        description: 'Shake Shack',
        amount: 9.59,
      },
      {
        description: 'Crinkle Cut Fries',
        amount: 2.99,
      },
      {
        description: 'Strawberry Shake',
        amount: 5.29,
      },
    ],
  };
  
  const customer = {
    name: 'Lin-Manuel Miranda',
    email: 'me@linmanuel.com',
    address: [
      '226 W 46th St',
      'New York, NY 10036',
    ],
    logoUrl: 'http://p.fod4.com/p/media/c9c34f4e09/JqdTM3oTiqTcrbFoLdxb_Hamilton_200x200.jpg',
  };

  const company = {
    name: 'Shake Shack',
    address: [
      'Madison Square Park',
      'New York, NY 10010',
    ],
    email: 'contact@shakeshack.com',
    logoUrl: 'https://www.shakeshack.com/wp-content/themes/shakeshack/images/shakeshack_logo.png',
  };


function InvoiceList(props) {
     const { classes } = props;
     return(
         <Invoice
          invoice={invoice}
          customer={customer}
          company={company}
          style={{background:'white'}}
          notes={(
            <p>
              If you have any questions, please
              email <a href="mailto:contact@shakeshack.com">contact@shakeshack.com</a>.
            </p>
          )}
        />
     )
}
export default InvoiceList;
