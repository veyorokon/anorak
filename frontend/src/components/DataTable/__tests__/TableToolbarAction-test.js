/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import Download16 from '@carbon/icons-react/lib/download/16';
import { TableToolbarAction } from '../';

describe('DataTable.TableToolbarAction', () => {
  it('should render', () => {
    const wrapper = mount(
      <TableToolbarAction
        className="custom-class"
        renderIcon={Download16}
        iconDescription="Add"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Custom icon in DataTable.TableToolbarAction', () => {
  it('should render', () => {
    const iconAction = mount(
      <TableToolbarAction renderIcon={Download16} iconDescription="Download" />
    );
    const originalIcon = mount(<Download16 />).find('svg');
    const icon = iconAction.find('svg');
    expect(icon.find(':not(svg):not(title)').html()).toBe(
      originalIcon.children().html()
    );
  });
});
