import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
// core components
import inputStyle from "assets/jss/components/Input/inputStyle";

class CustomInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      value: ""
    };
  }

  handleFocus = () => {
    this.setState({
      active: true
    });
  };
  handleBlur = () => {
    this.setState({
      active: false
    });
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    const {
      classes,
      formControlProps,
      disabled,
      id,
      error,
      inputprops,
      success
    } = this.props;
    const activeInput = this.state.value !== "" ? true : false;

    const wrapperClasses = classNames({
      [classes.activeWrapper]: this.state.active,
      [classes.wrapper]: true,
      [classes.disabledWrapper]: disabled,
      [classes.errorWrapper]: error
    });
    const inputWrapperClasses = classNames({
      [classes.inputWrapper]: true,
      [classes.disabledInputWrapper]: disabled
    });
    const inputClasses = classNames({
      [classes.input]: true,
      [classes.activeInput]: activeInput,
      [classes.disabledInput]: disabled,
      [classes.errorInput]: error
    });

    return (
      <FormControl {...formControlProps} className={classes.formControl}>
        <div className={wrapperClasses}>
          <div className={inputWrapperClasses}>
            <input
              id={id}
              {...inputprops}
              className={inputClasses}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            />

            {error ? (
              <Clear
                className={
                  classes.feedback +
                  " " +
                  classes.labelRoot +
                  " " +
                  classes.labelRootError
                }
              />
            ) : success ? (
              <Check
                className={
                  classes.feedback +
                  " " +
                  classes.labelRoot +
                  " " +
                  classes.labelRootSuccess
                }
              />
            ) : null}
          </div>
        </div>
      </FormControl>
    );
  }
}

CustomInput.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string,
  inputprops: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  success: PropTypes.bool
};

export default withStyles(inputStyle)(CustomInput);
