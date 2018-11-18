import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Field, Form, Formik } from 'formik';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

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
    },
    marginRight: 10,
    flexBasis: '50%'
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
  stripeForm: {
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 5
  }
});

const CustomInputComponent = ({ field, form, ...props }) => (
  <TextField id={field.name} {...field} {...props} />
);

class CreateForm extends React.Component {
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

  renderField = (name, label, other = {}) => (
    <Field
      component={CustomInputComponent}
      fullWidth
      label={label}
      name={name}
      required
      {...other}
    />
  );

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Typography component="h2" variant="h5" gutterBottom>
          Create A Squad
        </Typography>
        <Typography className={classes.subtitle} variant="subtitle1">
          Create your own subscription service.
        </Typography>

        <Mutation mutation={CREATE_SQUAD}>
          {createSquad => (
            <Formik
              initialValues={{
                description: '',
                secret: '',
                maxSize: '',
                service: '',
                costPrice: ''
              }}
              onSubmit={async (values, { setSubmitting }) => {
                await this.onSubmit(createSquad, values);
                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Typography variant="subtitle1">Squad Form</Typography>
                  <Grid container spacing={24}>
                    <Grid item xs={12}>
                      {this.renderField('service', 'Service Name', {
                        // autoComplete: 'fname'
                      })}
                    </Grid>
                    <Grid item xs={12}>
                      {this.renderField('description', 'Description', {
                        // autoComplete: 'billing address-line1'
                      })}
                    </Grid>
                    <Grid item xs={12}>
                      {this.renderField('secret', 'Secret', {
                        // autoComplete: 'billing address-line2',
                        // required: false
                      })}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {this.renderField('maxSize', 'Maximum Size', {
                        // autoComplete: 'billing address-level2'
                      })}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {this.renderField('costPrice', 'Cost')}
                    </Grid>
                  </Grid>

                  <Button
                    className={classes.button}
                    color="primary"
                    disabled={isSubmitting}
                    type="submit"
                    variant="outlined"
                  >
                    Create
                  </Button>
                </Form>
              )}
            </Formik>
          )}
        </Mutation>
      </Paper>
    );
  }
}

CreateForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateForm);
