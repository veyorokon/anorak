import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MaterialUiSnackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

export default class Snackbar extends React.Component {
  onClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.props.onClose(event);
  };

  render() {
    return (
      <MaterialUiSnackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={this.props.open}
        autoHideDuration={6000}
        onClose={this.onClose}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">{this.props.message}</span>}
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
    );
  }
}
