import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import clsx from "clsx";
import DesktopMacRoundedIcon from "@material-ui/icons/DesktopMacRounded";
import AlbumRoundedIcon from '@material-ui/icons/AlbumRounded';
import LibraryMusicRoundedIcon from '@material-ui/icons/LibraryMusicRounded';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import Link from "next/link";
import {Router, useRouter} from 'next/router';
import { AuthContext } from "../hooks/Auth";
import { route } from "next/dist/next-server/server/router";
import { PersonAddRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: "0",
    marginRight: 30,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  body: {
    display: "flex",
    position: "relative",
  },
  desktopDrawerContainer: {
    width: 250,
    height: "calc(100vh - 64px)",
    transition: "width 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    zIndex: theme.zIndex.drawer,
  },
  contentContainer: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    backgroundColor: theme.palette.background.default,
    overflow: "hidden",
    boxSizing: "content-box",
    overflowY: "scroll"
  },
  drawerWrapper: {},
  slideWidth: {
    width: 0,
  },
  mobileDrawerContainer: {
    width: "100vw",
    height: "calc( 100vh - 64px)",
    backgroundColor: "#5a5858db",
    position: "absolute",
    top: 0,
    left: 0,
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    zIndex: theme.zIndex.drawer,
  },
  mobileDrawer: {
    width: 250,
    height: "calc(100vh - 64px)",
    transition: "width 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    zIndex: theme.zIndex.drawer,
  },
  hideMobileDrawer: {
    width: 0,
  },
  DrawerItemColor: {
    color: theme.palette.primary.contrastText,
  },
  loaderStyle:{
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "0vw",
    height: "5px",
    backgroundColor: theme.palette.secondary.main,
  padding: "0px",
  margin: "0px",
  animation: "$progressbar 1500ms infinite alternate",
  transform: "translateX(100vw)",
    boxShadow: theme.shadows[3]
  },
  toolbar: {
    position: "relative",
  },
  appbar: {
    boxShadow: theme.shadows[3],
  },
  "@keyframes progressbar": {
  "0%": {
    width: "0vw",
    transform: "translateX(0vw)",
  },
  "50%":{
    width: "75vw",
    transform: "translateX(12.5vw)",
  },
  "100%": {
    width: "0vw",
    transform: "translateX(100vw)",
  }
}
}));

export default function DefaultLayout(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [toggle, setToggle] = React.useState(false);
  const [mobileDrawer, setMobileDrawer] = React.useState(false);
  const router = useRouter();
  const auth = React.useContext(AuthContext);

  React.useEffect(()=>{
    if(auth.token===""){
      setToggle(true);
    }else{
      setToggle(false);
    }
  },[auth])

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const signOut = function(){
    handleMenuClose();
    auth.updateAuth("REMOVE");
  }

  const login = function(){
    router.push('/login');
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={signOut.bind(this)}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const navlist = [
    {
      name: "Dashboard",
      icon: <DesktopMacRoundedIcon />,
      route: "/",
    },
    {
      name: "Upload Album",
      icon: <AlbumRoundedIcon />,
      route: "/upload/album",
    },
    {
      name: "Upload Song",
      icon: <LibraryMusicRoundedIcon />,
      route: "/upload/song",
    },
    {
      name: "Upload Artist",
      icon: <PersonAddRounded />,
      route: "/upload/artist",
    },

  ];

  const drawerWraper = (
    <List>
      {navlist.map((item, index) => {
        return (
          <Link key={index.toString()} href={item.route}>
            <ListItem
              onClick={() => {
                console.log("this is printable");
              }}
              className={classes.DrawerItemColor}
              button
              selected={router.pathname===item.route}
            >
              <ListItemIcon className={classes.DrawerItemColor}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                style={{ whiteSpace: "nowrap" }}
                primary={item.name}
              />
            </ListItem>
          </Link>
        );
      })}
    </List>
  );

  const mobileDrawerWraper = (
    <List>
      {navlist.map((item, index) => {
        return (
          <Link key={index.toString()} href={item.route}>
            <ListItem
              onClick={function() {
                setMobileDrawer(false);
                setTimeout(function () {
                  setToggle(false);
                }, 200);
              }}
              className={classes.DrawerItemColor}
              button
              selected={router.pathname === item.route}
            >
              <ListItemIcon className={classes.DrawerItemColor}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                style={{ whiteSpace: "nowrap" }}
                primary={item.name}
              />
            </ListItem>
          </Link>
        );
      })}
    </List>
  );

  return (
    <div className={classes.grow}>
      <AppBar className={classes.appbar} position="static">
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => {
              if(auth.token!==""){
                if (toggle) {
                  setMobileDrawer(false);
                  setTimeout(() => {
                    setToggle(false);
                  }, 200);
                } else {
                  setToggle(true);
                  setTimeout(() => {
                    setMobileDrawer(true);
                  }, 100);
                }
              }
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Cloud-MusicBox
          </Typography>
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.sectionDesktop}>
            { auth.access_token !=='' && <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>}
            {
              auth.access_token === '' &&
              <Button onClick={login.bind(this)}>Login</Button>
            }
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
          {props.loading && <div className={classes.loaderStyle}></div>}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <div className={classes.body}>
        <div
          className={clsx(
            classes.desktopDrawerContainer,
            toggle && classes.slideWidth
          )}
        >
          <div className={classes.drawerWrapper}>{drawerWraper}</div>
        </div>
        {toggle && auth.token!=="" && (
          <div onClick={function(){
            setMobileDrawer(false);
            setTimeout(function() {
              setToggle(false);
            }, 200);
          }} className={classes.mobileDrawerContainer}>
            <div
              className={clsx(
                classes.mobileDrawer,
                !mobileDrawer && classes.hideMobileDrawer
              )}
            >
              {mobileDrawerWraper}
            </div>
          </div>
        )}
        <div className={classes.contentContainer}>{props.children}</div>
      </div>
    </div>
  );
}
