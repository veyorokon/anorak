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
  search: {
    borderRadius: "5px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#8f8f8f",
    position: "relative",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    minWidth: "20rem",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "60vw"
    },
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
