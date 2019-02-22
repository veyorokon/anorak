import React from 'react';
import TextField from '@material-ui/core/TextField';

function Search(props) {
  return (
    <TextField
      fullWidth
      onChange={ev => props.onSearch(ev.target.value)}
      label="Search"
      type="search"
      className="dashboard-tutorial-third"
      style={{ marginTop: 4 }}
    />
  );
}

export default Search;