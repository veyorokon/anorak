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

  "@keyframes clickAnimationLight": {
    "0%": {
      fontWeight: "initial",
      color: "initial"
    },

    "50%": {
      fontWeight: "bold",
      color: "black"
    },
    "100%": {
      fontWeight: "initial",
      color: "initial"
    }
  },
  "@keyframes clickAnimationDark": {
    "0%": {
      fontWeight: "initial",
      color: "rgb(102, 102, 102)"
    },

    "50%": {
      fontWeight: "bold",
      color: "#ccc"
    },

    "100%": {
      fontWeight: "initial",
      color: "rgb(102, 102, 102)"
    }
  }
};

export default buttonAnimation;
