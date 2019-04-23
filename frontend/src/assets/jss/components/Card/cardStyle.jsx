const cardStyle = theme => ({
  card: {
    border: "0",
    color: "black",
    background: "#fff",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    minWidth: "0",
    wordWrap: "break-word",
    boxShadow: "rgba(0, 0, 0, 0.12) 0px 2px .5rem 0px",
    borderRadius: ".5rem",
    marginBottom: "5rem",
    padding: " 1rem 3rem",
    transition: "all 0.2s ease",
    "&:hover": {
      boxShadow: "rgba(0, 0, 0, 0.12) 0px .5rem 1rem 0px"
    },
    "& > div:first-child": {
      padding: "2rem 2rem 1rem 0px"
    },
    "& > div:last-child": {
      padding: "1rem 2rem 2rem 0px"
    }
  },
  image: {
    padding: "1rem 3rem"
  },

  dark: {
    background: "black"
  }
});

export default cardStyle;
