import React from "react";
import PropTypes from "prop-types";
import { Form as FormikForm, Formik } from "formik";
import mapValues from "lodash/mapValues";

import FormField from "./FormField";

/**
 * Wraps formik's Form to handle a form config object. A form config object is
 * structured in a way where the keys act as the name of the field and the values
 * are objects that store common field information like label and input values.
 *
 * Configuring the object in this way allows this component to easily set initialValues
 * and render a field.
 */
export default class From extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    config: PropTypes.objectOf(
      PropTypes.shape({
        initialValue: PropTypes.any.isRequired,
        label: PropTypes.string,
        input: PropTypes.shape({
          autoComplete: PropTypes.string,
          required: PropTypes.bool,
          type: PropTypes.string
        })
      })
    ),
    onSubmit: PropTypes.func.isRequired
  };

  /**
   * @param  {string} name   a field name (a key in the config object prop)
   * @param  {object} custom overrides defaults if needed
   * @return {FormField}
   */
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
        initialValues={mapValues(this.props.config, "initialValue")}
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
