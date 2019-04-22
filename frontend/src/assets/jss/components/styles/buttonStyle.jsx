import {
  grayColor,
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor
} from "assets/jss/universal.jsx";
import buttonAnimation from "assets/jss/components/animations/buttonAnimation";

const buttonStyle = theme => ({
  ...buttonAnimation,
  button: {
    boxSizing: "border-box",
    minHeight: "auto",
    minWidth: "auto",
    backgroundColor: "#000",
    color: "#FFFFFF",
    borderRadius: "5px",
    position: "relative",
    padding: "0rem 2.5rem",
    fontSize: "1.2rem",
    fontWeight: "500",
    textTransform: "uppercase",
    verticalAlign: "middle",
    textAlign: "center",
    whiteSpace: "nowrap",
    touchAction: "manipulation",
    cursor: "pointer",
    border: "1px solid rgba(0,0,0,0)",
    transition: "all 0.2s ease",
    "&:hover": {
      color: "#000",
      backgroundColor: "#fff",
      border: "1px solid #000"
    },
    "& .fab,& .fas,& .far,& .fal, &.material-icons": {
      position: "relative",
      display: "inline-block",
      top: "0",
      marginTop: "-1em",
      marginBottom: "-1em",
      fontSize: "1.1rem",
      marginRight: "4px",
      verticalAlign: "middle"
    },
    "& svg": {
      position: "relative",
      display: "inline-block",
      top: "0",
      width: "18px",
      height: "18px",
      marginRight: "4px",
      verticalAlign: "middle"
    },
    "&$justIcon": {
      "& .fab,& .fas,& .far,& .fal,& .material-icons": {
        marginTop: "0px",
        position: "absolute",
        width: "100%",
        transform: "none",
        left: "0px",
        top: "0px",
        height: "100%",
        lineHeight: "41px",
        fontSize: "20px"
      }
    }
  },
  secondary: {
    backgroundColor: "#fff",
    color: "rgb(102, 102, 102)",
    border: "1px solid rgb(234, 234, 234)",
    "&:hover": {
      color: "#000",
      border: "1px solid #000"
    }
  },
  warning: {
    backgroundColor: "rgb(235, 87, 87)",
    color: "#fff",
    border: "1px solid rgb(235, 87, 87)",
    "&:hover": {
      color: "rgb(235, 87, 87)",
      border: "1px solid rgb(235, 87, 87)"
    }
  },
  highlight: {
    backgroundColor: "rgb(0, 118, 255)",
    color: "#fff",
    border: "1px solid rgb(0, 118, 255)",
    "&:hover": {
      color: "rgb(0, 118, 255)",
      border: "1px solid rgb(0, 118, 255)"
    }
  },

  shadow: {
    background: "white",
    color: "black",
    border: "1px solid rgba(0, 0, 0, 0) !important",
    boxShadow: "0 5px 10px rgba(0, 0, 0, 0.12)",
    "&:hover": {
      background: "white",
      color: "black",
      boxShadow: "0 7px 20px rgba(0, 0, 0, 0.16)",
      transform: "translate3d(0px,-1px,0px)",
      border: "1px solid rgba(0, 0, 0, 0) !important"
    },

    "&$highlight": {
      backgroundColor: "rgb(0, 118, 255)",
      color: "#fff",
      "&,&:focus,&:hover": {
        backgroundColor: "rgb(0, 118, 255)",
        color: "#fff"
      }
    },
    "&$warning": {
      backgroundColor: "rgb(235, 87, 87)",
      color: "#fff",
      border: "1px solid rgb(235, 87, 87)",
      "&:hover": {
        color: "rgb(235, 87, 87)",
        border: "1px solid rgb(235, 87, 87)"
      }
    }
  },

  disabledWrapper: {
    cursor: "not-allowed !important",
    display: "inline-block"
  },
  disabled: {
    color: "#ccc",
    pointerEvents: "none",
    background: "#fafafa",
    border: "1px solid rgb(234, 234, 234)"
  },

  loadingDots: {
    "&> div": {
      display: "inline-block",
      fontSize: "0",
      margin: "0 .25rem",
      background: "#000",
      width: " 0.5rem",
      height: "0.5rem",
      borderRadius: "50%",
      animation: `loadingAnimation 0.9s alternate infinite`
    },
    "&> div:nth-of-type(2)": {
      animationDelay: ".4s"
    },
    "&> div:nth-of-type(3)": {
      animationDelay: ".6s"
    }
  },

  link: {
    color: "black",
    background: "transparent",
    "&:hover": {
      backgroundColor: "transparent",
      color: "black",
      border: "1px solid rgba(0,0,0,0) !important",
      textDecoration: "underline solid rgb(102, 102, 102)"
    },

    "&$warning": {
      color: "rgb(235, 87, 87)",
      border: "1px solid rgba(0, 0, 0, 0)",
      "&:hover": {
        color: "rgb(235, 87, 87)",
        textDecoration: "underline solid rgb(235, 87, 87)"
      }
    },
    "&$highlight": {
      color: "rgb(0, 118, 255)",
      border: "1px solid rgba(0, 0, 0, 0)",
      "&:focus,&:hover": {
        color: "rgb(0, 118, 255)",
        textDecoration: "underline solid rgb(0, 118, 255)"
      }
    },
    "&$disabled": {
      color: "#ccc",
      border: "1px solid rgba(0, 0, 0, 0)",
      "&:focus,&:hover": {
        color: "#ccc",
        textDecoration: "underline solid rgb(102, 102, 102)"
      }
    }
  },

  loading: {
    color: "#ccc",
    pointerEvents: "none",
    background: "#fafafa",
    border: "1px solid rgb(234, 234, 234)"
  },

  lg: {
    height: "4rem",
    minWidth: "20rem"
  },
  sm: {
    minWidth: "10rem",
    minHeight: "2.4rem"
  },

  round: {
    borderRadius: "30px"
  },
  block: {
    width: "100% !important"
  },

  leftIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: ".8rem",
    right: "auto"
  },
  rightIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: ".8rem",
    left: "auto"
  },

  justIcon: {
    paddingLeft: "12px",
    paddingRight: "12px",
    fontSize: "20px",
    height: "41px",
    minWidth: "41px",
    width: "41px",
    "& .fab,& .fas,& .far,& .fal,& svg,& .material-icons": {
      marginRight: "0px"
    },
    "&$lg": {
      height: "57px",
      minWidth: "57px",
      width: "57px",
      lineHeight: "56px",
      "& .fab,& .fas,& .far,& .fal,& .material-icons": {
        fontSize: "32px",
        lineHeight: "56px"
      },
      "& svg": {
        width: "32px",
        height: "32px"
      }
    },
    "&$sm": {
      height: "30px",
      minWidth: "30px",
      width: "30px",
      "& .fab,& .fas,& .far,& .fal,& .material-icons": {
        fontSize: "17px",
        lineHeight: "29px"
      },
      "& svg": {
        width: "17px",
        height: "17px"
      }
    }
  }
});

export default buttonStyle;
