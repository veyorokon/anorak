import { primaryColor } from "assets/jss/material-dashboard-react";

const cardStyle = theme => ({
  card: {
    border: "0",
    marginBottom: "30px",
    marginTop: "30px",
    borderRadius: "6px",
    color: "rgba(0, 0, 0, 0.87)",
    background: "#fff",
    width: "100%",
    boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    minWidth: "0",
    wordWrap: "break-word",
    fontSize: ".875rem"
  },
  cardPlain: {
    background: "transparent",
    boxShadow: "none"
  },
  cardPrimary: {
    background: primaryColor
  },
  cardBlack: {
    background: "black"
  },
  cardProfile: {
    marginTop: "30px",
    textAlign: "center"
  },
  cardChart: {
    "& p": {
      marginTop: "0px",
      paddingTop: "0px"
    }
  },
  cardSubscription: {
    background: "#191C21",
    width: "100%",
    height: "300px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    [theme.breakpoints.up("xs")]: {
      height: "250px"
    },
    [theme.breakpoints.up("sm")]: {
      height: "300px"
    }
  },
  cardSubscriptionLight: {
    background: "#fff",
    width: "100%",
    height: "300px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    [theme.breakpoints.up("xs")]: {
      height: "250px"
    },
    [theme.breakpoints.up("sm")]: {
      height: "300px"
    }
  },
  cardMain: {
    marginTop: "30px",
    textAlign: "center",
    height: "300px"
  },
  cardAdd: {
    background: "rgba(49,50,64,0.08)",
    border: "1px solid #cccccc",
    boxShadow: "inset 0 1px 4px 0 rgba(0,0,0,0.50)",
    height: "300px"
  }
});

export default cardStyle;
