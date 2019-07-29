import React from "react";
// @material-ui/core components
// core components
import NavPills from "components/material-dashboard/NavPills/NavPills.jsx";
import AddBox from "@material-ui/icons/AddBox";
import IntegrationAutosuggest from "./SuggestSearch";

function Subscription(props) {
  const { classes, services } = props;
  var searchList = [];
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

  for (var i = 0; i < services.length; i++) {
    searchList.push({ label: services[i].name });
  }

  return (
    <div className={classes.container}>
      <div id="navigation-pills">
        <div className={classes.title}>
          <h3>
            <small>Step 1: Choose Subscription Service:</small>
          </h3>
        </div>
        <IntegrationAutosuggest
          setValCallBack={props.handleSetSubscription}
          searchList={searchList}
        />
      </div>
    </div>
  );
}

export default Subscription;
