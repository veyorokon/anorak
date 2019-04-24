const buttonAnimation = {
  "@keyframes loadingAnimation": {
    "0%": {
      opacity: "0.1",
      transform: "scale(0.2, 0.2)"
    },

    "100%": {
      opacity: "1",
      transform: "scale(1, 1)"
    }
  },

  "@keyframes clickAnimation": {
    "0%": {
      fontWeight: "initial",
      color: "initial"
    },

    "100%": {
      fontWeight: "bold",
      color: "black"
    }
  }
};

export default buttonAnimation;
