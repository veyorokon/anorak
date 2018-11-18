import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Field as FormikField } from 'formik';

const MaterialUiInputComponent = ({ field, form, ...props }) => (
  <TextField id={field.name} {...field} {...props} />
);

function FormField(props) {
  return <FormikField component={MaterialUiInputComponent} {...props} />;
}

export default FormField;
