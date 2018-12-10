import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import MainActionButton from './MainActionButton';

const rows = [
  { id: 'name', numeric: false, label: 'Name' },
  { id: 'size', numeric: true, label: 'Size' },
  { id: 'duration', numeric: true, label: 'Duration' },
  { id: 'price', numeric: true, label: 'Price' },
  { id: 'button', numeric: false, label: '' }
];

function SearchTableHead() {
  return (
    <TableHead>
      <TableRow>
        {rows.map(row => (
          <TableCell key={row.id} numeric={row.numeric}>
            {row.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const styles = theme => ({
  table: {
    minWidth: 700
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  button: {
    margin: theme.spacing.unit,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#231C07 !important'
    }
  },
  white: {
    color: 'white'
  }
});

function SearchTable(props) {
  const { classes } = props;
  return (
    <Paper>
      <div className={classes.tableWrapper}>
        <Table className={classes.table} aria-labelledby="tableTitle">
          <SearchTableHead />
          <TableBody>
            {props.squads.map((squad, i) => (
              <TableRow hover key={i}>
                <TableCell component="th" scope="row">
                  {squad.service}
                </TableCell>
                <TableCell numeric>
                  {squad.currentSize} / {squad.maximumSize}
                </TableCell>
                <TableCell numeric>monthly</TableCell>
                <TableCell numeric>
                  ${(squad.costPrice / 100).toFixed(2)}
                </TableCell>
                <TableCell>
                  <MainActionButton
                    price={squad.costPrice}
                    service={squad.service}
                    squadID={squad.id}
                    description={squad.description}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Paper>
  );
}

SearchTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchTable);
