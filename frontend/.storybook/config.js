import { configure, addParameters } from '@storybook/react';
import 'assets/css/styles.css';
import Theme from "./theme"

// Option defaults.
addParameters({
  options: {
    theme: Theme,
  },
});

const req = require.context('../src/components', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
