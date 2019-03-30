import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import { renderToStaticMarkup } from "react-dom/server";
import Invoice from "components/material-dashboard/Invoice/Invoice";
import Card from "components/material-dashboard/Card/Card";
import { USER_INVOICES } from "lib/queries";
import { Query } from "react-apollo";
import { getToken, calcAnorakFee } from "lib/utility.jsx";

const company = {
  name: "iAnorak",
  address: ["1600 Villa Street", "Mountain View, CA 94041"],
  email: "support@ianorak.com",
  logoUrl: ""
};

function _InvoiceCard(props) {
  const { classes, invoice, customer, company } = props;
  return (
    <Invoice
      invoice={invoice}
      customer={customer}
      company={company}
      notes={
        <p>
          If you have any questions, please email{" "}
          <a href="mailto:contact@shakeshack.com">contact@shakeshack.com</a>.
        </p>
      }
    />
  );
}

const InvoiceCard = _InvoiceCard;

class InvoiceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0.0
    };
  }

  customer = user => {
    const customer = user.stripeCustomer;
    const line1 = customer.line1 || "";
    const line2 = customer.line2 || "";
    const city = customer.city || "";
    const state = customer.state || "";
    const country = customer.country || "";
    return {
      name: `${user.firstName} ${user.lastName}`,
      email: `${user.email}`,
      address: [`${line1}`, `${line2}`, `${city} ${state} ${country}`],
      logoUrl:
        "http://p.fod4.com/p/media/c9c34f4e09/JqdTM3oTiqTcrbFoLdxb_Hamilton_200x200.jpg"
    };
  };

  getAccount = data => {
    return data.subscriptionMember.subscriptionAccount;
  };

  calcTotal = items => {
    var total = 0.0;
    for (var i = 0; i < items.length; i++) {
      total += items[i].amount;
    }

    return total;
  };

  invoice = user => {
    const invoiceData = user.invoices[0];
    const customer = user.stripeCustomer;
    const card = user.stripeCustomer.lastFour || "";

    var fee = parseFloat(calcAnorakFee(this.calcTotal(invoiceData.items)));

    const items = invoiceData.items.map(item => ({
      description:
        this.getAccount(item).service.name +
        ` ${this.getAccount(item).pricePlan.amount} Monthly`,
      usage: item.usage + " days",
      amount: item.amount
    }));
    items.push({
      description: "Anorak Fee",
      usage: "-",
      amount: fee
    });
    return {
      createdDate: `${invoiceData.dateCreated}`,
      dueDate: `${invoiceData.dateFor}`,
      paymentMethod: `Credit Card`,
      id: "",
      description: "Subscription Service Management",
      items: items
    };
  };

  render() {
    const token = getToken();
    return token ? (
      <Query
        query={USER_INVOICES}
        variables={{ token: token }}
        fetchPolicy="no-cache"
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          if (data.user.invoices[0].items.length > 0) {
            return (
              <InvoiceCard
                invoice={this.invoice(data.user)}
                customer={this.customer(data.user)}
                company={company}
              />
            );
          }
          return <div />;
        }}
      </Query>
    ) : (
      <div />
    );
  }
}

export default InvoiceList;
