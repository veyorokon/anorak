import { successColor } from "assets/jss/material-dashboard-react.jsx";

const dashboardStyle = theme => ({
  successText: {
    color: successColor
  },
  upArrowCardCategory: {
    width: "16px",
    height: "16px"
  },
  stats: {
    color: "#999999",
    display: "inline-flex",
    fontSize: "12px",
    lineHeight: "22px",
    "& svg": {
      top: "4px",
      width: "16px",
      height: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px"
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      top: "4px",
      fontSize: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px"
    }
  },
  cardCategory: {
    color: "#999999",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    paddingTop: "10px",
    marginBottom: "0"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.99)",
    margin: "0",
    marginTop: "0",
    paddingTop: "10px",
    marginBottom: "0",
    fontSize: "14px",
    fontWeight: "bold",
    letterSpacing: "1px"
  },
  cardCategoryBlack: {
    color: "#000",
    margin: "0",
    marginTop: "0",
    paddingTop: "10px",
    marginBottom: "0",
    fontWeight: "bold",
    letterSpacing: "1px",
    fontSize: "14px"
  },
  cardCategoryRed: {
    color: "red",
    margin: "0",
    marginTop: "0",
    paddingTop: "10px",
    marginBottom: "0",
    fontWeight: "bold",
    letterSpacing: "1px",
    fontSize: "14px"
  },
  cardCategorySuccess: {
    color: successColor,
    margin: "0",
    marginTop: "0",
    paddingTop: "10px",
    marginBottom: "0",
    fontWeight: "bold",
    letterSpacing: "1px",
    fontSize: "14px"
  },
  cardCategorySpaced: {
    color: "#000",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    paddingTop: "10px",
    marginBottom: "0",
    letterSpacing: "1px",
    display: "flex",
    justifyContent: "space-between"
  },
  cardTitle: {
    color: "#3C4858",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  cardTitleWhite: {
    color: "white",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  cardInLine: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline"
  },
  cardInLineMargin: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    margin: "0 1rem"
  },
  cardImage: {
    width: "60%",
    height: "auto",
    maxHeight: "60%",
    margin: "auto auto",
    padding: "initial",
    display: "block",
    minWidth: "185px"
  },
  subscriptionHeader: {
    color: successColor,
    margin: "unset"
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  subscriptionCardIcon: {
    boxShadow: "unset"
  },
  textLink: {
    cursor: "pointer",
    display: "contents",
    color: "black",
    "&:hover": {
      color: "black"
    }
  }
});

export default dashboardStyle;
