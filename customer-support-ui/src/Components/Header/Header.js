import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { NavLink } from "react-router-dom";
import { clsx } from 'clsx';
// import WorkspaceFeaturedPost from "../Workspace/WorkspaceFeaturedPost"

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor:'#272525',
    color:'blanchedalmond',
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
    backgroundColor:'aquamarine',
    color:'black',
    //fontSize: '15'
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
    textDecoration:'none'
  },
  borderbottom:
  {
    borderBottom:'3px solid blue',
    borderRadius:'3px',
  },
}));

const sections = [
  { title: "Quick Search", url: "#/" },
  { title: "Create Personalised Plan", url: "#/affirmations" },
  { title: "Game", url: "#/game" },
  { title: "Contact us", url: "#/" },
];

export default function Header(props) {
  const classes = useStyles();
  const { title } = props;

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Button color="inherit" size="small">
          {/* Subscribe */}
        </Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <NavLink to="/">
   
        </NavLink>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        {sections.map((section,index) => (
          <Link
            color="inherit"
            noWrap
            // style={{borderBottom:'1px solid blue'}}
            key={section.title}
            className={clsx( {                  
              [classes.borderbottom]: (props.activeMenu==section.title), 
              [classes.toolbarLink]:true             
              
            })}
            variant="body2"
            href={section.url}
            // className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
     
    </React.Fragment>
  );
}


// const mainFeaturedPost = {
//   title: "Nomu-San Support Workspace",
//   description:
//     "Enhance the capabilities of customer support team, improve response times, and ultimately provide better service to customers. ",
//   image:
//     "https://media.licdn.com/dms/image/D5612AQG-FsJ_6TJPuA/article-cover_image-shrink_720_1280/0/1679628763431?e=2147483647&v=beta&t=6cM4C82xiRe7XMavhoNQYGsjSd2ZgrAsE4StFT8J_VE",
//   imgText: "main image description",
//   linkText: "Continue reading…",
// };


Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};

