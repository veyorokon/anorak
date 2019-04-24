import { defaultFont } from "assets/jss/universal.jsx";
import { fade } from "@material-ui/core/styles/colorManipulator";

const inputStyle = theme => ({
  ...defaultFont,
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  appBar: {
    background: "#fff",
    color: "#000",
    boxShadow: "none"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    color: "#777",
    transition: "color .2s",
    "&:hover": {
      background: "none",
      color: "#000"
    }
  },
  title: {
    display: "none",
    marginRight: "2rem",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    },
    color: "#000",
    ...defaultFont
  },

  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#555"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    transition: theme.transitions.create("width"),
    width: "100%",
    fontSize: "1.4rem",
    [theme.breakpoints.up("md")]: {
      width: 250
    }
  },
  badge: {
    color: "black"
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

export default inputStyle;
