import React from "react";
import IconButton from "@material-ui/core/IconButton";
import MaterialUiSnackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

export default function withSnackbar(WrappedComponent) {
  return class extends React.Component {
    state = {
      open: false
    };

    onClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      this.setState({ open: false });
    };

    onTrigger = message => {
      this.setState({ message, open: true });
    };

    render() {
      return (
        <React.Fragment>
          <WrappedComponent triggerSnackbar={this.onTrigger} {...this.props} />
          <MaterialUiSnackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.onClose}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={<span id="message-id">{this.state.message}</span>}
            action={
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.onClose}
              >
                <CloseIcon />
              </IconButton>
            }
          />
        </React.Fragment>
      );
    }
  };
}
