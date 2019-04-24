import { defaultFont } from "assets/jss/universal.jsx";

const customInputStyle = {
  disabled: {
    "&:before": {
      backgroundColor: "transparent !important"
    }
  },
  underline: {
    "&:hover:not($disabled):before,&:before": {
      borderColor: "grey" + " !important",
      borderWidth: "1px !important"
    },
    "&:after": {
      borderColor: "grey"
    }
  },
  underlineError: {
    "&:after": {
      borderColor: "red"
    }
  },
  underlineSuccess: {
    "&:after": {
      borderColor: "green"
    }
  },
  input: {
    backgroundColor: "transparent",
    caretColor: "rgb(0, 0, 0)",
    fontSize: "inherit"
  },
  labelRoot: {
    ...defaultFont,
    color: "grey" + " !important",
    fontWeight: "400",
    fontSize: "1.4rem",
    lineHeight: "1.4"
  },
  labelRootError: {
    color: "red"
  },
  labelRootSuccess: {
    color: "green"
  },
  feedback: {
    position: "absolute",
    top: "1rem",
    right: "0",
    zIndex: "2",
    display: "block",
    width: "2.4rem",
    height: "2.4rem",
    textAlign: "center",
    pointerEvents: "none"
  },
  marginTop: {
    marginTop: "1.6rem"
  },
  formControl: {
    position: "relative",
    verticalAlign: "unset",
    marginRight: "2rem"
  }
};

export default customInputStyle;
