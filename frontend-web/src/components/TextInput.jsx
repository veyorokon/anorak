import React from 'react';

export default class TextInput extends React.Component {
  render() {
    return (
      <label>
        {this.props.label}
        <input
          type="text"
          name={this.props.name}
          onChange={this.props.onChange}
          value={this.props.value}
        />
      </label>
    );
  }
}
