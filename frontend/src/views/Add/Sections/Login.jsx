import React from "react";
// @material-ui/core components
// core components
import CustomInput from "components/material-dashboard/CustomInput/CustomInput.jsx";

function Login(props) {
  const { classes } = props;
  return (
    <div className={classes.container}>
      <div id="navigation-pills">
        <div className={classes.title}>
          <h3>
            <small>Optional: Add Your Account Password:</small>
          </h3>
        </div>
        <CustomInput
          labelText="Password"
          id="setpassword"
          type={"password"}
          onChange={props.handleOnChange}
          formControlProps={{
            fullWidth: true
          }}
        />
        <p>
          Once set, passwords can be retrieved anytime from your dashboard and
          shared with friends and family.
        </p>
      </div>
    </div>
  );
}

export default Login;
