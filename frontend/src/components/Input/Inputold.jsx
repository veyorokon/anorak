import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import inputStyle from "assets/jss/components/Input/inputStyle";

class Input extends React.Component {
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
      id,
      classesName,
      disabled,
      error,
      placeholder,
      icon,
      iconPosition
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
    const Icon = icon
      ? React.cloneElement(icon, {
          className: [classes.icon]
        })
      : null;

    return (
      <div className={wrapperClasses}>
        <div className={inputWrapperClasses}>
          {icon && (
            <span className={[classes[iconPosition + "Icon"]]}>{Icon}</span>
          )}
          <input
            id={id}
            placeholder={placeholder}
            className={inputClasses}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

Input.propTypes = {
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.boolean,
  error: PropTypes.boolean,
  id: PropTypes.string,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(["left", "right"]),
  placeholder: PropTypes.string
};

export default withStyles(inputStyle)(Input);
