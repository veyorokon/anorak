import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

function DebitCardForm() {
  return (
    <React.Fragment>
      <Typography variant="h6">Debit card</Typography>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <TextField
            required
            id="cardNumber"
            name="cardNumber"
            label="Card number"
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default DebitCardForm;
