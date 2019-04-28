import React from "react";
import PropTypes from "prop-types";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";

// Custom modules
import homeStyle from "assets/jss/views/homeStyle.jsx";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

// Queries and Mutations

import { withRouter } from "react-router-dom";

// <Carousel
//   autoPlay
//   infiniteLoop
//   transitionTime={600}
//   interval={4000}
//   showThumbs={false}
//   showStatus={false}
//   showIndicators={false}
// >
//   <div>
//     <img
//       className={classes.heroImage}
//       src={require("assets/img/carousel-6.jpg")}
//     />
//     <p className="legend" style={{ borderRadius: "5px" }}>
//       Legend 1
//     </p>
//   </div>
//   <div>
//     <img
//       className={classes.heroImage}
//       src={require("assets/img/carousel-6.jpg")}
//     />
//     <p className="legend" style={{ borderRadius: "5px" }}>
//       Legend 1
//     </p>
//   </div>
//   <div>
//     <img
//       className={classes.heroImage}
//       src={require("assets/img/carousel-6.jpg")}
//     />
//     <p className="legend" style={{ borderRadius: "5px" }}>
//       Legend 1
//     </p>
//   </div>
//
// </Carousel>

const tileData = [
  {
    key: 1,
    img: require("assets/img/carousel-4.jpg"),
    title: "Image",
    author: "author",
    cols: 2,
    rows: 2
  },
  {
    key: 2,
    img: require("assets/img/carousel-1.jpg"),
    title: "Image",
    author: "author",
    cols: 1,
    rows: 2
  },
  {
    key: 3,
    img: require("assets/img/carousel-2.jpg"),
    title: "Image",
    author: "author",
    cols: 1
  },
  {
    key: 4,
    img: require("assets/img/carousel-3.jpg"),
    title: "Image",
    author: "author",
    cols: 1
  },
  {
    key: 5,
    img: require("assets/img/carousel-4.jpg"),
    title: "Image",
    author: "author",
    cols: 1
  }
];

class _HeroContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.hero}>
        <GridList cellHeight={160} className={classes.gridList} cols={3}>
          {tileData.map(tile => (
            <GridListTile
              key={tile.key}
              cols={tile.cols || 1}
              rows={tile.rows || 1}
            >
              <img src={tile.img} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                titlePosition="top"
                actionIcon={
                  <IconButton className={classes.icon}>
                    <StarBorderIcon />
                  </IconButton>
                }
                actionPosition="left"
                className={classes.titleBar}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

const HeroContent = _HeroContent;

function Hero(props) {
  return <HeroContent {...props} />;
}

_HeroContent.propTypes = {
  classes: PropTypes.object.isRequired
};

Hero.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(homeStyle)(withRouter(Hero));
