/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import isEqual from 'lodash.isequal';
import { settings } from 'carbon-components';
import ListBox from '../ListBox';
import Checkbox from '../Checkbox';
import Selection from '../../internal/Selection';
import { sortingPropTypes } from './MultiSelectPropTypes';
import { defaultItemToString } from './tools/itemToString';
import { defaultSortItems, defaultCompareItems } from './tools/sorting';
import { componentsX } from '../../internal/FeatureFlags';

const { prefix } = settings;
const noop = () => undefined;

export default class MultiSelect extends React.Component {
  static propTypes = {
    ...sortingPropTypes,

    /**
     * Disable the control
     */
    disabled: PropTypes.bool,

    /**
     * Specify a custom `id`
     */
    id: PropTypes.string.isRequired,

    /**
     * We try to stay as generic as possible here to allow individuals to pass
     * in a collection of whatever kind of data structure they prefer
     */
    items: PropTypes.array.isRequired,

    /**
     * Allow users to pass in arbitrary items from their collection that are
     * pre-selected
     */
    initialSelectedItems: PropTypes.array,

    /**
     * Helper function passed to downshift that allows the library to render a
     * given item to a string label. By default, it extracts the `label` field
     * from a given item to serve as the item label in the list.
     */
    itemToString: PropTypes.func,

    /**
     * Generic `label` that will be used as the textual representation of what
     * this field is for
     */
    label: PropTypes.node.isRequired,

    /**
     * Specify the locale of the control. Used for the default `compareItems`
     * used for sorting the list of items in the control.
     */
    locale: PropTypes.string,

    /**
     * `onChange` is a utility for this controlled component to communicate to a
     * consuming component what kind of internal state changes are occuring.
     */
    onChange: PropTypes.func,

    /**
     * Specify 'inline' to create an inline multi-select.
     */
    type: PropTypes.oneOf(['default', 'inline']),

    /**
     *  Specify title to show title on hover
     */
    useTitleInItem: PropTypes.bool,

    /**
     * `true` to use the light version.
     */
    light: PropTypes.bool,

    /**
     * Is the current selection invalid?
     */
    invalid: PropTypes.bool,

    /**
     * If invalid, what is the error?
     */
    invalidText: PropTypes.string,

    /**
     * Initialize the component with an open(`true`)/closed(`false`) menu.
     */
    open: PropTypes.bool,

    /**
     * Callback function for translating ListBoxMenuIcon SVG title
     */
    translateWithId: PropTypes.func,
  };

  static getDerivedStateFromProps({ open }, state) {
    /**
     * programmatically control this `open` prop
     */
    const { prevOpen } = state;
    return prevOpen === open
      ? null
      : {
          isOpen: open,
          prevOpen: open,
        };
  }

  static defaultProps = {
    compareItems: defaultCompareItems,
    disabled: false,
    locale: 'en',
    itemToString: defaultItemToString,
    initialSelectedItems: [],
    sortItems: defaultSortItems,
    type: 'default',
    light: false,
    title: false,
    open: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      highlightedIndex: null,
      isOpen: props.open,
    };
  }

  handleOnChange = changes => {
    if (this.props.onChange) {
      this.props.onChange(changes);
    }
  };

  handleOnOuterClick = () => {
    this.setState({
      isOpen: false,
    });
  };

  handleOnStateChange = changes => {
    const { type } = changes;
    switch (type) {
      case Downshift.stateChangeTypes.keyDownArrowDown:
      case Downshift.stateChangeTypes.keyDownArrowUp:
      case Downshift.stateChangeTypes.itemMouseEnter:
        this.setState({ highlightedIndex: changes.highlightedIndex });
        break;
      case Downshift.stateChangeTypes.keyDownEscape:
      case Downshift.stateChangeTypes.mouseUp:
        this.setState({ isOpen: false });
        break;
      // Opt-in to some cases where we should be toggling the menu based on
      // a given key press or mouse handler
      // Reference: https://github.com/paypal/downshift/issues/206
      case Downshift.stateChangeTypes.clickButton:
      case Downshift.stateChangeTypes.keyDownSpaceButton:
        this.setState(() => {
          let nextIsOpen = changes.isOpen || false;
          if (changes.isOpen === false) {
            // If Downshift is trying to close the menu, but we know the input
            // is the active element in the document, then keep the menu open
            if (this.inputNode === document.activeElement) {
              nextIsOpen = true;
            }
          }
          return {
            isOpen: nextIsOpen,
          };
        });
        break;
    }
  };

  render() {
    const { highlightedIndex, isOpen } = this.state;
    const {
      ariaLabel,
      className: containerClassName,
      id,
      items,
      itemToString,
      label,
      type,
      disabled,
      initialSelectedItems,
      sortItems,
      compareItems,
      light,
      invalid,
      invalidText,
      useTitleInItem,
      translateWithId,
    } = this.props;
    const className = cx(`${prefix}--multi-select`, containerClassName, {
      [`${prefix}--list-box--light`]: light,
    });
    return (
      <Selection
        disabled={disabled}
        onChange={this.handleOnChange}
        initialSelectedItems={initialSelectedItems}
        render={({ selectedItems, onItemChange, clearSelection }) => (
          <Downshift
            highlightedIndex={highlightedIndex}
            isOpen={isOpen}
            itemToString={itemToString}
            onChange={onItemChange}
            onStateChange={this.handleOnStateChange}
            onOuterClick={this.handleOnOuterClick}
            selectedItem={selectedItems}
            render={({
              getRootProps,
              selectedItem,
              isOpen,
              itemToString,
              highlightedIndex,
              getItemProps,
              getButtonProps,
            }) => (
              <ListBox
                id={id}
                type={type}
                className={className}
                disabled={disabled}
                invalid={invalid}
                invalidText={invalidText}
                {...getRootProps({ refKey: 'innerRef' })}>
                <ListBox.Field
                  id={id}
                  tabIndex="0"
                  {...getButtonProps({ disabled })}>
                  {selectedItem.length > 0 && (
                    <ListBox.Selection
                      clearSelection={!disabled ? clearSelection : noop}
                      selectionCount={selectedItem.length}
                    />
                  )}
                  <span className={`${prefix}--list-box__label`}>{label}</span>
                  <ListBox.MenuIcon
                    isOpen={isOpen}
                    translateWithId={translateWithId}
                  />
                </ListBox.Field>
                {isOpen && (
                  <ListBox.Menu aria-label={ariaLabel} id={id}>
                    {componentsX
                      ? items.map((item, index) => {
                          const itemProps = getItemProps({ item });
                          const itemText = itemToString(item);
                          const isChecked =
                            selectedItem.filter(selected =>
                              isEqual(selected, item)
                            ).length > 0;
                          return (
                            <ListBox.MenuItem
                              key={itemProps.id}
                              isActive={isChecked}
                              isHighlighted={highlightedIndex === index}
                              {...itemProps}>
                              <Checkbox
                                id={`${itemProps.id}__checkbox`}
                                title={useTitleInItem ? itemText : null}
                                name={itemText}
                                checked={isChecked}
                                disabled={disabled}
                                readOnly={true}
                                tabIndex="-1"
                                labelText={itemText}
                              />
                            </ListBox.MenuItem>
                          );
                        })
                      : sortItems(items, {
                          selectedItems,
                          itemToString,
                          compareItems,
                          locale: 'en',
                        }).map((item, index) => {
                          const itemProps = getItemProps({ item });
                          const itemText = itemToString(item);
                          const isChecked =
                            selectedItem.filter(selected =>
                              isEqual(selected, item)
                            ).length > 0;
                          return (
                            <ListBox.MenuItem
                              key={itemProps.id}
                              isActive={isChecked}
                              isHighlighted={highlightedIndex === index}
                              {...itemProps}>
                              <Checkbox
                                id={`${itemProps.id}__checkbox`}
                                title={useTitleInItem ? itemText : null}
                                name={itemText}
                                checked={isChecked}
                                disabled={disabled}
                                readOnly={true}
                                tabIndex="-1"
                                labelText={itemText}
                              />
                            </ListBox.MenuItem>
                          );
                        })}
                  </ListBox.Menu>
                )}
              </ListBox>
            )}
          />
        )}
      />
    );
  }
}
