/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { withKnobs, number, text } from '@storybook/addon-knobs';
import Tabs from '../Tabs';
import Tab from '../Tab';
import TabsSkeleton from '../Tabs/Tabs.Skeleton';

const props = {
  tabs: () => ({
    className: 'some-class',
    selected: number('The index of the selected tab (selected in <Tabs>)', 1),
    triggerHref: text(
      'The href of trigger button for narrow mode (triggerHref in <Tabs>)',
      '#'
    ),
    role: text('ARIA role (role in <Tabs>)', 'navigation'),
    iconDescription: text(
      'The description of the trigger icon for narrow mode (iconDescription in <Tabs>)',
      'show menu options'
    ),
    onClick: action('onClick'),
    onKeyDown: action('onKeyDown'),
    onSelectionChange: action('onSelectionChange'),
    tabContentClassName: text(
      'The className for the child `<TabContent>` components',
      'tab-content'
    ),
  }),
  tab: () => ({
    href: text('The href for tab (href in <Tab>)', '#'),
    role: text('ARIA role (role in <Tab>)', 'presentation'),
    tabIndex: number('Tab index (tabIndex in <Tab>)', 0),
    onClick: action('onClick'),
    onKeyDown: action('onKeyDown'),
  }),
};

const CustomLabel = ({ text }) => <span>{text}</span>;

storiesOf('Tabs', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => (
      <Tabs {...props.tabs()}>
        <Tab {...props.tab()} label="Tab label 1">
          <div className="some-content" style={{ paddingLeft: 16 }}>
            Content for first tab goes here.
          </div>
        </Tab>
        <Tab {...props.tab()} label="Tab label 3">
          <div className="some-content" style={{ paddingLeft: 16 }}>
            Content for third tab goes here.
          </div>
        </Tab>
        <Tab {...props.tab()} label="Tab label 4">
          <div className="some-content" style={{ paddingLeft: 16 }}>
            Content for fourth tab goes here.
          </div>
        </Tab>
        <Tab {...props.tab()} label={<CustomLabel text="Custom Label" />}>
          <div className="some-content" style={{ paddingLeft: 16 }}>
            Content for second tab goes here.
          </div>
        </Tab>
      </Tabs>
    ),
    {
      info: {
        text: `
            Tabs are used to quickly navigate between views within the same context. Create individual
            Tab components for each item in the Tabs list.
          `,
      },
    }
  )
  .add('skeleton', () => <TabsSkeleton />, {
    info: {
      text: `
            Placeholder skeleton state to use when content is loading.
          `,
    },
  });
