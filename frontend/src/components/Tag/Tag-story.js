/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text, boolean } from '@storybook/addon-knobs';
import Tag, { types as typesList } from '../Tag';
import TagSkeleton from '../Tag/Tag.Skeleton';
import { componentsX } from '../../internal/FeatureFlags';

const types = typesList.reduce(
  (o, type) => ({
    ...o,
    [`${type} (${type})`]: type,
  }),
  {}
);

storiesOf('Tag', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => (
      <Tag
        className="some-class"
        type={select(
          'Tag type (type)',
          types,
          componentsX ? 'red' : 'experimental'
        )}
        disabled={boolean('Disabled (disabled)', false)}>
        {text('Content (children)', 'This is not a tag')}
      </Tag>
    ),
    {
      info: {
        text: `
            Tags are used for items that need to be labeled, categorized, or organized using keywords that describe them.
            The example below shows how the Tag component can be used. Each type has a default message describing the type,
            but a custom message can also be applied.
          `,
      },
    }
  )
  .add(
    'skeleton',
    () => (
      <div>
        <TagSkeleton />
      </div>
    ),
    {
      info: {
        text: `
          Placeholder skeleton state to use when content is loading.
          `,
      },
    }
  );
