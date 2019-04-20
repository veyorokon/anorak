/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import uid from '../../tools/uniqueId';
import Icon from '../Icon';
import { iconCheckmarkSolid } from 'carbon-icons';
import classNames from 'classnames';
import { settings } from 'carbon-components';
import CheckmarkFilled from '@carbon/icons-react/lib/checkmark--filled/16';
import { componentsX } from '../../internal/FeatureFlags';
import { keys, matches } from '../../tools/key';

const { prefix } = settings;

export default class RadioTile extends React.Component {
  static propTypes = {
    /**
     * `true` if this tile should be selected.
     */
    checked: PropTypes.bool,

    /**
     * The CSS class names.
     */
    className: PropTypes.string,

    /**
     * `true` if the `<input>` should be checked at initialization.
     */
    defaultChecked: PropTypes.bool,

    /**
     * The ID of the `<input>`.
     */
    id: PropTypes.string,

    /**
     * The `name` of the `<input>`.
     */
    name: PropTypes.string,

    /**
     * The description of the tile checkmark icon.
     */
    iconDescription: PropTypes.string,

    /**
     * The handler of the massaged `change` event on the `<input>`.
     */
    onChange: PropTypes.func,

    /**
     * The `value` of the `<input>`.
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

    /**
     * Specify the tab index of the wrapper element
     */
    tabIndex: PropTypes.number,
  };

  static defaultProps = {
    iconDescription: 'Tile checkmark',
    onChange: () => {},
    tabIndex: 0,
  };

  uid = this.props.id || uid();

  handleChange = evt => {
    this.props.onChange(this.props.value, this.props.name, evt);
  };

  handleKeyDown = evt => {
    if (matches(evt, [keys.ENTER, keys.SPACE])) {
      evt.preventDefault();
      this.props.onChange(this.props.value, this.props.name, evt);
    }
  };

  render() {
    const { children, className, iconDescription, ...other } = this.props;
    const classes = classNames(
      className,
      `${prefix}--tile`,
      `${prefix}--tile--selectable`,
      {
        [`${prefix}--tile--is-selected`]: this.props.checked,
      }
    );

    return (
      <>
        <input
          {...other}
          type="radio"
          className={`${prefix}--tile-input`}
          onChange={this.handleChange}
          id={this.uid}
        />
        <label
          htmlFor={this.uid}
          className={classes}
          tabIndex={this.props.tabIndex}
          onKeyDown={this.handleKeyDown}>
          <div className={`${prefix}--tile__checkmark`}>
            {componentsX ? (
              <CheckmarkFilled aria-label={iconDescription}>
                {iconDescription && <title>{iconDescription}</title>}
              </CheckmarkFilled>
            ) : (
              <Icon icon={iconCheckmarkSolid} description={iconDescription} />
            )}
          </div>
          <div className={`${prefix}--tile-content`}>{children}</div>
        </label>
      </>
    );
  }
}
