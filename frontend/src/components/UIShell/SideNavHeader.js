/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings } from 'carbon-components';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import SideNavIcon from './SideNavIcon';

const { prefix } = settings;

const SideNavHeader = ({ className: customClassName, children, icon }) => {
  const className = cx(`${prefix}--side-nav__header`, customClassName);
  return (
    <header className={className}>
      <SideNavIcon>{icon}</SideNavIcon>
      {children}
    </header>
  );
};

SideNavHeader.propTypes = {
  /**
   * Provide an optional class to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * Provide an icon to render in the header of the side navigation. Should be
   * an <svg> element.
   */
  icon: PropTypes.node.isRequired,
};

export default SideNavHeader;
