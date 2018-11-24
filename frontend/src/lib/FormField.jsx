import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import { Field as FormikField } from 'formik';

const MaterialUiInputComponent = ({ field, form, ...props }) => {
  if (props.type === 'checkbox') {
    return (
      <FormControlLabel
        control={<Checkbox id={field.name} {...field} {...props} />}
        label={props.label}
      />
    );
  }
  return <TextField id={field.name} {...field} {...props} />;
};

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
