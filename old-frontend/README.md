# SquadUp Frontend

Checkout the main README for a general overview of SquadUp including technologies used and installation.

## Source

SquadUp frontend was created using [Create React App](https://facebook.github.io/create-react-app/). The original README has been renamed to README_CRA.

## Layout

- `src/index.js` - The entry-point for the app.
- `src/App` - This is the "main" component. It's responsible for loading all the pages and setting up any frameworks used with in the app including the following:
  - Apollo
  - Material-UI
  - React Router
- `src/pages` - Each folder represents an entry-point for one of the pages imported in `src/App/Routes.jsx`. Within each of these folders is a "page" component as well as components that are only used in that page.
- `src/components` - Components that are currently or likely to be shared among pages.
  - **Cleanup Note**: Some of these components should be moved into a page's folder as they probably won't be shared among pages.
- `src/lib` - Non-React logic or React components that are more concerned with logic and/or setup compared to a visual component.

## Authentication

Users are identified by a token named `sessionToken` which is stored using `window.localStorage`.

## Development

### Adding a new page

1. Add a new folder with a component to `src/pages`.
2. Import this new component into `src/pages/index.js`.
3. Add a route to `src/App/Routes.jsx`.

### Adding a new form

If the form is going to be similar to one of the already created forms, use the `Form` component located at `src/lib/Form`. This component utilizes the [Render Props](https://reactjs.org/docs/render-props.html) technique. One example can be found at `src/pages/Signup/Form`.

1. Import the aforementioned `Form` component.
2. Create a form config object (the format is specified in the `Form` component's documentation).
3. Import that file and pass it into the `Form` component along with the `onSubmit` prop.
4. Use the `renderField` function provided by the component to render the fields defined in the config file.

### Adding a query

[Apollo documentation](https://www.apollographql.com/docs/react/essentials/queries.html)

### Adding a mutation

[Apollo documentation](https://www.apollographql.com/docs/react/essentials/mutations.html)

### Customizing Material-UI styling

More thorough documentation could be found on the [Material-UI site](https://material-ui.com/customization/overrides/).

1. Create a "theme" object where each key is the name of a class and each value is an object of css rules.
2. Pass that into the `withStyles` HOC along with the component.
3. Pass each defined class (located at `props.classes`) into the associated Material-UI component using the `className` prop.

An example can be found in pretty much any component including `src/components/AccountButtons`.
