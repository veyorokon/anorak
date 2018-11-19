import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import Form from '../../../lib/Form';
import formConfig from './form';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const CREATE_SQUAD = gql`
  mutation CreateSquad(
    $token: String!
    $service: String!
    $secret: String!
    $costPrice: Float!
    $description: String!
    $maxSize: Int!
  ) {
    createSquad(
      token: $token
      service: $service
      secret: $secret
      costPrice: $costPrice
      description: $description
      maxSize: $maxSize
    ) {
      squad {
        id
      }
    }
  }
`;

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      padding: theme.spacing.unit * 3
    }
  },
  button: {
    marginTop: theme.spacing.unit * 3
  },
  subtitle: {
    marginBottom: 16
  },
  topForm: {
    marginBottom: 24
  },
  root: {
    width: '90%'
  },
  backButton: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

function getSteps() {
  return [
    'Tell us about your squad.',
    'Squadmember permissions.',
    'Confirm and complete!'
  ];
}

class CreateForm extends React.Component {
  state = {
    activeStep: 0
  };

  onSubmit = async (createSquad, values) => {
    const { data } = await createSquad({
      variables: {
        token: window.localStorage.getItem('sessionToken'),
        service: values.service,
        secret: values.secret,
        costPrice: values.costPrice,
        description: values.description,
        maxSize: values.maxSize
      }
    });
    console.log(data);
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
    if (this.state.activeStep >= 3) {
      this.onSubmit();
    }
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  getFirstSetpContent() {
    return (
      <Mutation mutation={CREATE_SQUAD}>
        {createSquad => (
          <Form
            config={formConfig}
            onSubmit={async (values, { setSubmitting }) => {
              await this.onSubmit(createSquad, values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, renderField }) => (
              <div>
                <Typography variant="subtitle1">Squad Form</Typography>
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    {renderField('service', {
                      fullWidth: true
                    })}
                  </Grid>
                  <Grid item xs={12}>
                    {renderField('description', {
                      fullWidth: true
                    })}
                  </Grid>
                </Grid>
              </div>
            )}
          </Form>
        )}
      </Mutation>
    );
  }

  getSecondSetpContent() {
    return (
      <Mutation mutation={CREATE_SQUAD}>
        {createSquad => (
          <Form
            config={formConfig}
            onSubmit={async (values, { setSubmitting }) => {
              await this.onSubmit(createSquad, values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, renderField }) => (
              <div>
                <Typography variant="subtitle1">Squad Form</Typography>
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    {renderField('secret', {
                      fullWidth: true
                    })}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {renderField('maxSize', {
                      fullWidth: true
                    })}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {renderField('costPrice', {
                      fullWidth: true
                    })}
                  </Grid>
                </Grid>
              </div>
            )}
          </Form>
        )}
      </Mutation>
    );
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return this.getFirstSetpContent();
      case 1:
        return this.getSecondSetpContent();
      case 2:
        return '';
      default:
        return 'Uknown stepIndex';
    }
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <Paper className={classes.paper}>
        <Typography component="h2" variant="h5" gutterBottom>
          Create A Squad
        </Typography>
        <Typography className={classes.subtitle} variant="subtitle1">
          Create your own squad.
        </Typography>

        <div>
          {this.state.activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed
              </Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              {this.getStepContent(activeStep)}
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map(label => {
                  return (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button
                  className={classes.button}
                  color="primary"
                  type="submit"
                  variant="contained"
                  onClick={this.handleNext}
                >
                  {activeStep === steps.length - 1 ? 'Create' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Paper>
    );
  }
}

CreateForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateForm);
