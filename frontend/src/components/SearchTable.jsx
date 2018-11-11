import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

const rows = [
  { id: 'name', numeric: false, label: 'Name' },
  { id: 'size', numeric: true, label: 'Size' },
  { id: 'duration', numeric: true, label: 'Duration' },
  { id: 'price', numeric: true, label: 'Price' },
  { id: 'button', numeric: false, label: '' }
];

function createData(name, size, duration, price) {
  return { name, size, duration, price };
}

const TABLE_DATA = [
  createData('Netflix', '2 / 8', 'Monthly', 2.0),
  createData('Netflix', '2 / 8', 'Monthly', 2.0),
  createData('Netflix', '2 / 8', 'Monthly', 2.0),
  createData('Netflix', '2 / 8', 'Monthly', 2.0),
  createData('Netflix', '2 / 8', 'Monthly', 2.0),
  createData('Netflix', '2 / 8', 'Monthly', 2.0),
  createData('Netflix', '2 / 8', 'Monthly', 2.0),
  createData('Netflix', '2 / 8', 'Monthly', 2.0),
  createData('Netflix', '2 / 8', 'Monthly', 2.0),
  createData('Netflix', '2 / 8', 'Monthly', 2.0),
  createData('Netflix', '2 / 8', 'Monthly', 2.0),
  createData('Netflix', '2 / 8', 'Monthly', 2.0)
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
            {TABLE_DATA.map((n, i) => (
              <TableRow hover key={i}>
                <TableCell component="th" scope="row">
                  {n.name}
                </TableCell>
                <TableCell numeric>{n.size}</TableCell>
                <TableCell numeric>{n.duration}</TableCell>
                <TableCell numeric>
                  ${n.price}
                  .00
                </TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    variant="contained"
                    className={classes.button}
                  >
                    <Typography className={classes.white} noWrap>
                      Squad
                    </Typography>
                    <Typography color="secondary" noWrap>
                      Up
                    </Typography>
                  </Button>
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
