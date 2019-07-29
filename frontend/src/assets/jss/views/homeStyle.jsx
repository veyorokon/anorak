import {} from "assets/jss/universal.jsx";

const homeLayoutStyle = theme => ({
  hero: {
    height: "50rem",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden"
  },

  gridList: {
    width: "100%",
    height: "inherit"
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  },
  icon: {
    color: "white"
  }
});

export default homeLayoutStyle;
