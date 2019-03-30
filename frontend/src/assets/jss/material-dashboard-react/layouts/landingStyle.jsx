import {
  drawerWidth,
  transition,
  container,
  h4
} from "assets/jss/material-dashboard-react.jsx";

const appStyle = theme => ({
  mainPanel: {
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch"
  },
  content: {
    marginTop: "70px",
    padding: "30px 15px",
    minHeight: "calc(100vh - 123px)"
  },
  wrapper: {
    zIndex: "12",
    color: "#FFFFFF",
    ...container
  },
  map: {
    marginTop: "70px"
  }
});

export default appStyle;
