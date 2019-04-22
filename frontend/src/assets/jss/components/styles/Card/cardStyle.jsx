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
    boxShadow: "rgba(0, 0, 0, 0.12) 0px 2px 5px 0px",
    borderRadius: "5px",
    marginBottom: "50px",
    padding: " 10px 30px",
    transition: "all 0.2s ease",
    "&:hover": {
      boxShadow: "rgba(0, 0, 0, 0.12) 0px 5px 10px 0px"
    }
  },
  dark: {
    background: "black",
    color: "white"
  }
});

export default cardStyle;
