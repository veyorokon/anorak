import React from "react";
// @material-ui/core components
import Group from "@material-ui/icons/Group";
import Person from "@material-ui/icons/Person";
import NavPillsModded from "components/material-dashboard/NavPills/NavPillsModded.jsx";

// core components

function Plan(props) {
  const { classes, selectedService, services, planSelected } = props;

  var pricingPlans = [];
  if (services[selectedService] != null) {
    pricingPlans = services[selectedService].pricingPlans;
  }
  var tabs = pricingPlans.map(plan => {
    if (plan.maximumSize === 1) {
      return {
        tabButton: "Individual",
        tabIcon: Person,
        marginedTab: true,
        tabContent: (
          <span>
            <p>
              Individual monthly plan for ${plan.amount}. Allows streaming for
              only 1 session.
            </p>
          </span>
        )
      };
    }
    return {
      tabButton: "Group",
      tabIcon: Group,
      marginedTab: true,
      tabContent: (
        <span>
          <p>
            Group monthly plan for ${plan.amount}. Allows streaming for{" "}
            {plan.maximumSize} simultaneous sessions.
          </p>
        </span>
      )
    };
  });

  return (
    <div className={classes.container}>
      <div id="navigation-pills">
        <div className={classes.title}>
          <h3>
            <small>Step 2: Choose Your Plan:</small>
          </h3>
        </div>
        <NavPillsModded
          active={planSelected}
          setValCallBack={props.handleSetPlan}
          color="success"
          tabs={tabs}
        />
      </div>
    </div>
  );
}

export default Plan;
