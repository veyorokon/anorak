const cardFooterStyle = theme => ({
  cardFooter: {
    padding: "0",
    paddingTop: "10px",
    marginBottom: "1vh",
    borderRadius: "0",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    border: "0"
  },
  cardFooterProfile: {
    marginTop: "-15px"
  },
  cardFooterPlain: {
    paddingLeft: "5px",
    paddingRight: "5px",
    backgroundColor: "transparent"
  },
  cardFooterStats: {
    borderTop: "1px solid #eee",
    marginTop: "20px",
    "& svg": {
      position: "relative",
      top: "4px",
      marginRight: "3px",
      marginLeft: "3px",
      width: "16px",
      height: "16px"
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      fontSize: "16px",
      position: "relative",
      top: "4px",
      marginRight: "3px",
      marginLeft: "3px"
    }
  },
  cardFooterChart: {
    borderTop: "1px solid #eee"
  },
  cardFooterSubscription: {
    borderTop: "1px solid #222222",
    [theme.breakpoints.up("md")]: {
      marginLeft: "unset"
    }
  }
});

export default cardFooterStyle;
