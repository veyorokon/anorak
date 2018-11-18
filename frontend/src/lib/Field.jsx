import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Field as FormikField } from 'formik';

const CustomInputComponent = ({ field, form, ...props }) => (
  <TextField id={field.name} {...field} {...props} />
);

function Field(props) {
  return (
    <FormikField
      component={CustomInputComponent}
      fullWidth
      label={props.label}
      name={props.name}
      required
      {...props.other}
    />
  );
}

export default Field;
