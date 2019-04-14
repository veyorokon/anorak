import React from "react";
// @material-ui/core components
// core components
import NavPills from "components/material-dashboard/NavPills/NavPills.jsx";
import AddBox from "@material-ui/icons/AddBox";

function Subscription(props) {
  const { classes, services } = props;
  var tabs = services.map(service => ({
    tabButton: service.name,
    tabIcon: AddBox,
    marginedTab: true,
    tabContent: (
      <span>
        <p>{service.name} streaming service for content on demand.</p>
      </span>
    )
  }));

  return (
    <div className={classes.container}>
      <div id="navigation-pills">
        <div className={classes.title}>
          <h3>
            <small>Step 1: Choose Subscription Service:</small>
          </h3>
        </div>
        <NavPills
          setValCallBack={props.handleSetSubscription}
          color="success"
          tabs={tabs}
        />
      </div>
    </div>
  );
}

export default Subscription;
