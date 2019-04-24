import { defaultFont } from "assets/jss/universal.jsx";
import buttonAnimation from "assets/jss/animations/buttonAnimation";

const buttonStyle = {
  ...buttonAnimation,
  button: {
    ...defaultFont,
    boxSizing: "border-box",
    minHeight: "auto",
    minWidth: "auto",
    borderRadius: ".5rem",
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
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "#000"
    },

    "& svg": {
      position: "relative",
      display: "inline-block",
      top: "0",
      width: "2rem",
      height: "2rem",
      verticalAlign: "middle"
    }
  },

  primary: {
    backgroundColor: "#fff",
    color: "#000",
    border: "1px solid rgba(255,255,255,1)",
    "&:hover": {
      color: "#fff",
      border: "1px solid rgba(255,255,255,1)"
    }
  },
  secondary: {
    backgroundColor: "#000",
    color: "rgb(234, 234, 234)",
    border: "1px solid rgb(102, 102, 102)",
    "&:hover": {
      color: "#000",
      backgroundColor: "#fff"
    }
  },
  plain: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    color: "rgb(102, 102, 102)",
    border: "1px solid rgb(0, 0, 0,0)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0)",
      color: "rgb(102, 102, 102)",
      border: "1px solid rgb(0, 0, 0,0)"
    },
    "&:focus, &:active, &:visited": {
      border: "1px solid rgb(0, 0, 0,0)",
      animation: `clickAnimationDark 0.2s`
    }
  },
  warning: {
    backgroundColor: "rgb(235, 87, 87)",
    color: "#fff",
    border: "1px solid rgb(0, 0, 0, 0)",
    "&:hover": {
      color: "rgb(235, 87, 87)",
      border: "1px solid rgb(0, 0, 0, 0)",
      backgroundColor: "#fff"
    }
  },
  highlight: {
    backgroundColor: "rgb(0, 118, 255)",
    color: "#fff",
    border: "1px solid rgb(0, 0, 0, 0)",
    "&:hover": {
      color: "rgb(0, 118, 255)",
      border: "1px solid rgb(0, 0, 0, 0)",
      backgroundColor: "#fff"
    }
  },

  shadow: {
    background: "white",
    color: "black",
    border: "1px solid rgba(0, 0, 0, 0) !important",
    boxShadow: "0 .5rem 1rem rgba(0, 0, 0, 0.12)",
    "&:hover": {
      background: "white",
      color: "black",
      boxShadow: "0 7px 2rem rgba(0, 0, 0, 0.16)",
      transform: "translate3d(0px,-1px,0px)",
      border: "1px solid rgba(0, 0, 0, 0) !important"
    },

    "&$highlight": {
      backgroundColor: "rgb(0, 118, 255)",
      color: "#fff",
      "&:hover": {
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
    cursor: "not-allowed",
    display: "inline-block"
  },
  disabled: {
    color: "rgb(102, 102, 102)",
    pointerEvents: "none",
    background: "rgb(17, 17, 17)",
    border: "1px solid rgb(68, 68, 68)"
  },

  loadingDots: {
    "&> div": {
      display: "inline-block",
      fontSize: "0",
      margin: "0 .25rem",
      background: "rgb(68, 68, 68)",
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
    border: "1px solid rgba(0,0,0,0) !important",
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
  md: {
    height: "3.4rem",
    minWidth: "12rem"
  },
  sm: {
    minWidth: "10rem",
    minHeight: "2.4rem"
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
  }
};

export default buttonStyle;
