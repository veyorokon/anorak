import React from "react";
// @material-ui/core components
import Group from "@material-ui/icons/Group";
import Person from "@material-ui/icons/Person";
import NavPillsModded from "components/material-dashboard/NavPills/NavPillsModded.jsx";
import { getPlanFrequency } from "lib/utility.jsx";

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
            <ul>
              <li>
                <p>
                  Plan size:{" "}
                  <span style={{ fontWeight: "bold" }}>Individual</span>
                </p>
              </li>

              <li>
                <p>
                  Plan cycle:{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {getPlanFrequency(plan.billingFrequency).toLowerCase()}
                  </span>
                </p>
              </li>

              <li>
                <p>
                  Plan price:{" "}
                  <span style={{ fontWeight: "bold" }}>
                    ${plan.amount.toFixed(2)}
                  </span>
                </p>
              </li>
            </ul>
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
          <ul>
            <li>
              <p>
                Plan size:{" "}
                <span style={{ fontWeight: "bold" }}>
                  Group of {plan.maximumSize}
                </span>
              </p>
            </li>

            <li>
              <p>
                Plan cycle:{" "}
                <span style={{ fontWeight: "bold" }}>
                  {getPlanFrequency(plan.billingFrequency).toLowerCase()}
                </span>
              </p>
            </li>

            <li>
              <p>
                Plan price:{" "}
                <span style={{ fontWeight: "bold" }}>
                  ${plan.amount.toFixed(2)}
                </span>
              </p>
            </li>
          </ul>
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
          color="primary"
          tabs={tabs}
        />
      </div>
    </div>
  );
}

export default Plan;
