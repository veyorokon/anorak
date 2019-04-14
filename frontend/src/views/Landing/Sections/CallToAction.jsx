import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import GridContainer from "components/material-landing/Grid/GridContainer.jsx";
import GridItem from "components/material-landing/Grid/GridItem.jsx";
import CustomInput from "components/material-landing/CustomInput/CustomInput.jsx";
import Button from "components/material-landing/CustomButtons/Button.jsx";
import { Mutation } from "react-apollo";
import Form from "components/material-dashboard/Form/Form";
import { CREATE_USER } from "lib/mutations";
import withSnackbar from "components/material-dashboard/Form/withSnackbar";
import workStyle from "assets/jss/material-kit-react/views/landingPageSections/workStyle.jsx";
import Card from "components/material-dashboard/Card/Card.jsx";
import CardBody from "components/material-dashboard/Card/CardBody.jsx";
import { withRouter } from "react-router-dom";

class CallToAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      submitted: false,
      firstNameSuccess: false,
      lastNameSuccess: false,
      emailSuccess: false,
      passwordSuccess: false
    };
  }

  onSubmit = async (createUser, values) => {
    createUser({
      variables: {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password
      }
    }).then(({ data }) => {
      window.localStorage.setItem("sessionToken", data.createUser.token);
      // Add mixpanel here
      this.setState({ submitted: true });
      this.props.triggerSnackbar("You've successfully created your account!");
    });
  };

  onChangeHandler = event => {
    var id = event.target.id;
    var val = event.target.value;
    var obj = {};
    obj[id] = val;
    if (id == "firstName" && this.state.firstName.length > 0) {
      obj.firstNameSuccess = true;
    }
    if (id == "lastName" && this.state.lastName.length > 0) {
      obj.lastNameSuccess = true;
    }
    if (id == "email" && this.state.email.indexOf("@") > -1) {
      obj.emailSuccess = true;
    }
    if (id == "password" && this.state.password.length > 4) {
      obj.passwordSuccess = true;
    }

    this.setState(obj);
  };

  // CHECK PASSWORDS
  // CHECK NAME

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem cs={12} sm={12} md={8}>
            <h2 className={classes.title}>
              The Best Free Subscription Manager
            </h2>
            <h5 className={classes.description}>
              It's free to create an Anorak account!
            </h5>
            <Mutation mutation={CREATE_USER}>
              {createUser => (
                <Form
                  onSubmit={async (values, { setSubmitting }) => {
                    await this.onSubmit(createUser);
                    setTimeout(() => {
                      setSubmitting(false);
                    }, 600);
                  }}
                >
                  {({ isSubmitting }) => {
                    var color = "info";
                    var text = "SignUp";

                    if (this.state.submitted) {
                      color = "success";
                      text = "Success";
                    }
                    return (
                      <GridContainer>
                        <Card>
                          <CardBody>
                            <GridContainer>
                              <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                  labelText="First Name"
                                  id="firstName"
                                  success={this.state.firstNameSuccess}
                                  formControlProps={{
                                    fullWidth: true,
                                    onChange: this.onChangeHandler
                                  }}
                                />
                              </GridItem>
                              <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                  labelText="Last Name"
                                  id="lastName"
                                  success={this.state.lastNameSuccess}
                                  formControlProps={{
                                    fullWidth: true,
                                    onChange: this.onChangeHandler
                                  }}
                                />
                              </GridItem>
                              <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                  labelText="Your Email"
                                  id="email"
                                  success={this.state.emailSuccess}
                                  formControlProps={{
                                    fullWidth: true,
                                    onChange: this.onChangeHandler
                                  }}
                                />
                              </GridItem>

                              <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                  labelText="Password"
                                  id="password"
                                  success={this.state.passwordSuccess}
                                  formControlProps={{
                                    fullWidth: true,
                                    onChange: this.onChangeHandler
                                  }}
                                  inputProps={{ type: "password" }}
                                />
                              </GridItem>
                            </GridContainer>
                            <GridItem
                              xs={12}
                              sm={12}
                              md={4}
                              className={classes.textCenter}
                            >
                              {this.state.submitted ? (
                                <Button
                                  color="primary"
                                  onClick={() =>
                                    this.props.history.push("/dashboard/home")
                                  }
                                >
                                  Go To Your Dashboard
                                </Button>
                              ) : (
                                <Button
                                  color={color}
                                  disabled={
                                    true || isSubmitting || this.state.submitted
                                  }
                                  type="submit"
                                >
                                  {text}
                                </Button>
                              )}
                            </GridItem>
                          </CardBody>
                        </Card>
                      </GridContainer>
                    );
                  }}
                </Form>
              )}
            </Mutation>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(workStyle)(withSnackbar(withRouter(CallToAction)));
