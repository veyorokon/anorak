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
import CardMedia from '@material-ui/core/CardMedia';

const rows = [
  {
    id: 'image',
    numeric: false,
    label: null,
    style: { height: 10, width: 30 }
  },
  { id: 'name', numeric: false, label: 'Name', style: {} },
  { id: 'size', numeric: true, label: 'Size', style: {} },
  { id: 'duration', numeric: true, label: 'Duration', style: {} },
  { id: 'price', numeric: true, label: 'Price', style: {} },
  { id: 'button', numeric: false, label: '', style: {} }
];

function SearchTableHead() {
  return (
    <TableHead>
      <TableRow>
        {rows.map(row => (
          <TableCell key={row.id} numeric={row.numeric} style={row.style}>
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
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'scale-down',
    height: 50,
    borderRadius: 7
  },
  mediaCell: {
    paddingLeft: 10,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0
  },
  buttonCell: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0
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
                <TableCell
                  className={classes.mediaCell}
                  component="th"
                  scope="row"
                >
                  <CardMedia
                    component="img"
                    alt={props.service}
                    className={classes.media}
                    image="https://i.imgur.com/CIBULCG.jpg"
                    title={props.service}
                  />
                </TableCell>
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
                    size={squad.currentSize}
                    capacity={squad.maximumSize}
                    owner={squad.owner}
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
