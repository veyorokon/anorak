/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import Downshift from 'downshift';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';
import WarningFilled16 from '@carbon/icons-react/lib/warning--filled/16';
import ListBox, { PropTypes as ListBoxPropTypes } from '../ListBox';
import { componentsX } from '../../internal/FeatureFlags';

const { prefix } = settings;

const defaultItemToString = item => {
  if (typeof item === 'string') {
    return item;
  }

  return item ? item.label : '';
};

export default class Dropdown extends React.Component {
  static propTypes = {
    /**
     * Disable the control
     */
    disabled: PropTypes.bool,

    /**
     * We try to stay as generic as possible here to allow individuals to pass
     * in a collection of whatever kind of data structure they prefer
     */
    items: PropTypes.array.isRequired,

    /**
     * Allow users to pass in an arbitrary item or a string (in case their items are an array of strings)
     * from their collection that are pre-selected
     */
    initialSelectedItem: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ]),

    /**
     * Specify a custom `id`
     */
    id: PropTypes.string.isRequired,

    /**
     * Specify whether you want the inline version of this control
     */
    inline: PropTypes.bool,

    /**
     * Specify if the currently selected value is invalid.
     */
    invalid: PropTypes.bool,

    /**
     * Message which is displayed if the value is invalid.
     */
    invalidText: PropTypes.string,

    /**
     * Helper function passed to downshift that allows the library to render a
     * given item to a string label. By default, it extracts the `label` field
     * from a given item to serve as the item label in the list.
     */
    itemToString: PropTypes.func,

    /**
     * Function to render items as custom components instead of strings.
     * Defaults to null and is overriden by a getter
     */
    itemToElement: PropTypes.func,

    /**
     * `onChange` is a utility for this controlled component to communicate to a
     * consuming component what kind of internal state changes are occuring.
     */
    onChange: PropTypes.func,

    /**
     * Generic `label` that will be used as the textual representation of what
     * this field is for
     */
    label: PropTypes.node.isRequired,

    /**
     * 'aria-label' of the ListBox component.
     */
    ariaLabel: PropTypes.string,

    /**
     * The dropdown type, `default` or `inline`
     */
    type: ListBoxPropTypes.ListBoxType,

    /**
     * In the case you want to control the dropdown selection entirely.
     */
    selectedItem: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),

    /**
     * `true` to use the light version.
     */
    light: PropTypes.bool,

    /**
     * Provide the title text that will be read by a screen reader when
     * visiting this control
     */
    titleText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

    /**
     * Provide helper text that is used alongside the control label for
     * additional help
     */
    helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  };

  static defaultProps = {
    disabled: false,
    type: 'default',
    itemToString: defaultItemToString,
    itemToElement: null,
    light: false,
    titleText: '',
    helperText: '',
  };

  handleOnChange = selectedItem => {
    if (this.props.onChange) {
      this.props.onChange({ selectedItem });
    }
  };

  render() {
    const {
      className: containerClassName,
      disabled,
      items,
      label,
      ariaLabel,
      itemToString,
      itemToElement,
      type,
      initialSelectedItem,
      selectedItem,
      id,
      titleText,
      helperText,
      light,
      invalid,
      invalidText,
    } = this.props;
    const inline = type === 'inline';
    const className = ({ isOpen }) =>
      cx(`${prefix}--dropdown`, containerClassName, {
        [`${prefix}--dropdown--invalid`]: invalid,
        [`${prefix}--dropdown--open`]: isOpen,
        [`${prefix}--dropdown--inline`]: inline,
        [`${prefix}--dropdown--disabled`]: disabled,
        [`${prefix}--dropdown--light`]: light,
      });
    const titleClasses = cx(`${prefix}--label`, {
      [`${prefix}--label--disabled`]: disabled,
    });
    const title = titleText ? (
      <label htmlFor={id} className={titleClasses}>
        {titleText}
      </label>
    ) : null;
    const helperClasses = cx(`${prefix}--form__helper-text`, {
      [`${prefix}--form__helper-text--disabled`]: disabled,
    });
    const helper = helperText ? (
      <div className={helperClasses}>{helperText}</div>
    ) : null;
    const wrapperClasses = cx(
      `${prefix}--dropdown__wrapper`,
      `${prefix}--list-box__wrapper`,
      {
        [`${prefix}--dropdown__wrapper--inline`]: inline,
        [`${prefix}--list-box__wrapper--inline`]: inline,
        [`${prefix}--dropdown__wrapper--inline--invalid`]: inline && invalid,
        [`${prefix}--list-box__wrapper--inline--invalid`]: inline && invalid,
      }
    );

    // needs to be Capitalized for react to render it correctly
    const ItemToElement = itemToElement;
    const Dropdown = (
      <>
        {title}
        {!inline && helper}
        <Downshift
          onChange={this.handleOnChange}
          itemToString={itemToString}
          defaultSelectedItem={initialSelectedItem}
          selectedItem={selectedItem}>
          {({
            isOpen,
            itemToString,
            selectedItem,
            highlightedIndex,
            getRootProps,
            getButtonProps,
            getItemProps,
            getLabelProps,
          }) => (
            <ListBox
              id={id}
              type={type}
              className={className({ isOpen })}
              disabled={disabled}
              isOpen={isOpen}
              invalid={invalid}
              invalidText={invalidText}
              {...getRootProps({ refKey: 'innerRef' })}>
              {componentsX && invalid && (
                <WarningFilled16
                  className={`${prefix}--list-box__invalid-icon`}
                />
              )}
              <ListBox.Field
                id={id}
                tabIndex="0"
                {...getButtonProps({ disabled })}>
                <span
                  className={`${prefix}--list-box__label`}
                  {...getLabelProps()}>
                  {selectedItem ? itemToString(selectedItem) : label}
                </span>
                <ListBox.MenuIcon isOpen={isOpen} />
              </ListBox.Field>
              {isOpen && (
                <ListBox.Menu aria-label={ariaLabel} id={id}>
                  {items.map((item, index) => (
                    <ListBox.MenuItem
                      key={itemToString(item)}
                      isActive={selectedItem === item}
                      isHighlighted={
                        highlightedIndex === index || selectedItem === item
                      }
                      {...getItemProps({ item, index })}>
                      {itemToElement ? (
                        <ItemToElement key={itemToString(item)} {...item} />
                      ) : (
                        itemToString(item)
                      )}
                    </ListBox.MenuItem>
                  ))}
                </ListBox.Menu>
              )}
            </ListBox>
          )}
        </Downshift>
      </>
    );
    return componentsX ? (
      <div className={wrapperClasses}>{Dropdown}</div>
    ) : (
      Dropdown
    );
  }
}
