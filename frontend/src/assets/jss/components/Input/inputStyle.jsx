import { defaultFont } from "assets/jss/universal.jsx";

const customInputStyle = {
  wrapper: {
    alignItems: "center",
    display: "inline-flex",
    height: "37px",
    position: "relative",
    verticalAlign: "middle",
    minWidth: "15rem",
    borderRadius: "5px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#8f8f8f",
    color: "rgb(225, 225, 225)",
    borderImage: "initial",
    transition: "border 0.2s ease 0s, color 1s ease 0s",
    background: "rgb(255, 255, 255)",
    fontSize: "1.4rem",
    "&:hover": {
      borderColor: "#6f6f6f"
    }
  },
  activeWrapper: {
    borderColor: "#555 !important"
  },
  inputWrapper: {
    display: "inline-flex",
    alignItems: "center",
    position: "relative",
    width: "100%",
    margin: " 4px 10px",
    fontSize: "inherit",
    "&disabled": {
      margin: " 40px 10px"
    }
  },
  input: {
    lineHeight: "2.7rem",
    width: "100%",
    color: "inherit",
    backgroundColor: "transparent",
    caretColor: "rgb(0, 0, 0)",
    borderRadius: "0px",
    borderWidth: "initial",
    borderStyle: "none",
    borderColor: "initial",
    borderImage: "initial",
    outline: "0px",
    underline: "none",
    fontSize: "inherit",
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: "#555",
      transition: "color .2s ease 0s"
    },
    "&:focus": {
      color: "#000",
      "&::placeholder": {
        color: "#333"
      }
    }
  },
  activeInput: {
    color: "#000"
  },
  disabledWrapper: {
    borderColor: "rgb(225, 225, 225) !important",
    cursor: "not-allowed"
  },
  disabledInputWrapper: {
    pointerEvents: "none"
  },
  disabledInput: {
    color: "#999",
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: "#999"
    }
  },

  errorWrapper: {
    borderColor: "red !important"
  },
  errorInput: {
    color: "red !important",
    "&::placeholder": {
      color: "red !important"
    }
  },

  labelRoot: {
    ...defaultFont,
    color: "#555",
    transition: "color .2s ease 0s"
  },
  labelRootError: {
    color: "red"
  },
  labelRootSuccess: {
    color: "green"
  },
  feedback: {
    zIndex: "2",
    textAlign: "center",
    pointerEvents: "none",
    marginLeft: "1rem"
  },

  formControl: {
    position: "relative",
    transition: "border 0.2s ease 0s, color 1s ease 0s",
    background: "rgb(255, 255, 255)",
    fontSize: "1.4rem",
    "&:hover": {
      borderColor: "#6f6f6f"
    }
  }
};

export default customInputStyle;
