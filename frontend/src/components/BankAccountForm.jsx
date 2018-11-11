import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

function BankAccountForm() {
  return (
    <React.Fragment>
      <Typography variant="h6">Bank Account</Typography>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <TextField
            required
            id="routingNumber"
            name="routingNumber"
            label="Routing or transit number"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="accountNumber"
            name="accountNumber"
            label="Account number"
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default BankAccountForm;
