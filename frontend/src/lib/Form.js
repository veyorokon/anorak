import React from 'react';
import PropTypes from 'prop-types';
import { Form as FormikForm, Formik } from 'formik';
import mapValues from 'lodash/mapValues';

import FormField from './FormField';

export default class From extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    config: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  renderField = (name, custom) => {
    const fieldConfig = this.props.config[name];
    if (!fieldConfig) {
      throw Error(`Config for ${name} is not defined`);
    }
    return (
      <FormField
        label={fieldConfig.label}
        name={name}
        {...fieldConfig.input}
        {...custom}
      />
    );
  };

  render() {
    return (
      <Formik
        initialValues={mapValues(this.props.config, 'initialValue')}
        onSubmit={this.props.onSubmit}
      >
        {formikFields => (
          <FormikForm>
            {this.props.children({
              ...formikFields,
              renderField: this.renderField
            })}
          </FormikForm>
        )}
      </Formik>
    );
  }
}
