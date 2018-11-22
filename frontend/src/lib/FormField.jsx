import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Field as FormikField } from 'formik';

const MaterialUiInputComponent = ({ field, form, ...props }) => (
  <TextField id={field.name} {...field} {...props} />
);

/**
 * A combination of a formik field and material-ui TextField so that we can utilize
 * formik while styling our field at the same time.
 * @constructor
 */
function FormField(props) {
  return <FormikField component={MaterialUiInputComponent} {...props} />;
}
FormField.props = {
  ...FormikField.PropTypes,
  ...TextField.PropTypes
};

export default FormField;
