import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import logo from '../../assets/logo.svg';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { blue } from '@material-ui/core/colors';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';

//applies all button styling, to the icon
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// Enables AppBar to have a bottom hovering shadow once scrolling
function ElevationScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });

}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

// Theming for components, can inherit from Theme.js using ...theme.mixin.x
const useStyles = makeStyles(theme => ({
    toolbarMargin: {
        // need this to fix hidden text behind bar
        ...theme.mixins.toolbar,
        marginBottom: "3em",
        [theme.breakpoints.down("md")]: {
            marginBottom: "2em"
        },
        [theme.breakpoints.down("xs")]: {
            marginBottom: "1.25em"
        }
    },
    logo: {
        height: "8em",
        [theme.breakpoints.down("md")]: {
            height: "7em"
        },
        [theme.breakpoints.down("xs")]: {
            height: "5.5em"
        }
    },
    logoContainer: {
        padding: 0,
        "&:hover": {
            backgroundColor: "transparent" //disables hover highlighting
        }
    },
    tabContainer: {
        marginLeft: "auto"
    },
    tab: {
        ...theme.typography.tab,
        minWidth: 10,
        marginLeft: "25px"
    },
    button: {
        ...theme.typography.estimate,
        borderRadius: "50px",
        marginLeft: "50px",
        marginRight: "25px",
        height: "45px",
    },
    menu: {
        background: theme.palette.common.arcBlue,
        color: theme.palette.common.white,
        borderRadius: "0px"
    },
    menuItem: {
        ...theme.typography.tab,
        opacity: .7,
        "&:hover": {
            opacity: 1
        }
    },
    drawerIconContainer: {
        "&:hover": {
            backgroundColor: "transparent"
        },
        marginLeft: "auto"
    },
    drawerIcon: {
        height: "50px",
        width: "50px",
        marginRight: "10px"
    },
    listContainer: {

    },
    listItem: {
        ...theme.typography.tab,
        opacity: .7,
        "&:hover": {
            opacity: 1
        }
    },

    // tests
    appbarRoundedTest: {
        borderTopLeftRadius: "20px"
    }
}))


export default function Header(props) {

    // for styling
    const classes = useStyles();
    //for routing
    const [value, setValue] = useState(0);
    const handleChange = (e, newValue) => {
        setValue(newValue)
    }
    // for menu
    const [anchorEl, setAnchorEl] = useState(null) //this determines what state to store and what we want rendered, which in this case is the services tab
    const [openMenu, setOpenMenu] = useState(false) //determines visibility of the menu, displayed or not, setting to closed (false) to begin
    const handleClick = (e) => { //click event containing info on where we clicked on the screen
        setAnchorEl(e.currentTarget) //tells menu where we want it to be rendered
        setOpenMenu(true)
    }
    const handleClose = (e) => {
        setAnchorEl(null)
        setOpenMenu(false)
    }

    // for menu links
    const [selectedIndex, setSelectedIndex] = useState(0)

    //refactoring manu links that share code
    const menuOptions = [
        { name: "Services", link: "/services", activeIndex: 1, selectedIndex: 0 },
        { name: "Custom Software Development", link: "/customsoftware", activeIndex: 1, selectedIndex: 1 },
        { name: "Mobile App Devleopment", link: "/mobileapps", activeIndex: 1, selectedIndex: 2 },
        { name: "Website Dev", link: "/websites", activeIndex: 1, selectedIndex: 3 }
    ]
    const routes = [
        { name: "Home", link: "/", activeIndex: 0 },
        {
            name: "Services", link: "/services", activeIndex: 1,
            ariaOwns: anchorEl ? "simple-menu" : undefined,
            ariaPopup: anchorEl ? "true" : undefined,
            mouseOver: event => handleClick(event)
        },
        { name: "The Revolution", link: "/revolution", activeIndex: 2 },
        { name: "About Us", link: "/about", activeIndex: 3 },
        { name: "Contact Us", link: "/contact", activeIndex: 4 }
    ]
    // //from refactor of service route specific inline properties
    // aria-owns={anchorEl ? "simple-menu" : undefined} //check if there is a non-null(or closed) anchorEl, then set aria-owns to simple-menu, otherwise make it undefined
    // area-haspopup={anchorEl ? "true" : undefined}
    // onMouseOver={event => handleClick(event)} //instead of onClick, allows hover-over menu popup
    const handleMenuItemClick = (e, i) => {
        setAnchorEl(null);
        setOpenMenu(false);
        setSelectedIndex(i);
    }


    // allows routing to match with paths, content, active
    useEffect(() => {
        [...menuOptions, ...routes].forEach(route => {
            switch (window.location.pathname) {
                case `${route.link}`:
                    if (value !== route.activeIndex) {
                        setValue(route.activeIndex);
                        if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
                            setSelectedIndex(route.selectedIndex)
                        }
                    }
                    break;

                default:
                    break;
            }
        })
    }, [value, menuOptions, selectedIndex, routes]);

    // for iOS and swipe drawer
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const [openDrawer, setOpenDrawer] = useState(false);

    //for media queries
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md")); //anything below media px width, returns true
    const tabs = (
        // allows two adjacent elements without any placeholder to wrap them
        <React.Fragment>
            <Tabs
                className={classes.tabContainer}
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
            >
                {routes.map((route, index) => (
                    <Tab
                        key={`${route}${index}`} //to create unique id
                        className={classes.tab}
                        component={Link}
                        to={route.link}
                        label={route.name}
                        aria-owns={route.ariaOwns}
                        aria-haspopup={route.ariaPopup}
                        onMouseOver={route.mouseOver}
                    />
                ))}
                <Tab className={classes.tab} component={Link} to="/" label="Home" />

            </Tabs>
            <Button variant="contained" color="secondary" className={classes.button}>
                Free Estimate
                        </Button>
            <Menu id="simple-menu" anchorEl={anchorEl} open={openMenu} onClose={handleClose}
                MenuListProps={{ onMouseLeave: handleClose }}
                classes={{ paper: classes.menu }}
                elevation={0}
                keepMounted
            >
                {menuOptions.map((option, i) => (
                    <MenuItem
                        key={option}
                        component={Link}
                        to={option.link} //whatever option we're on, select that options link as defined in menuOptions array
                        classes={{ root: classes.menuItem }} //apply styling
                        onClick={(event) => { handleMenuItemClick(event, i); setValue(1); handleClose(); }}
                        // ^^^if you look at handleMenuItemClick function, it takes two args, an event and an index number. Because it needs the event, you have to pass in the event in the arrow function, and then include it in the funcion. The i comes from our .map() call
                        selected={i === selectedIndex && value === 1} //the i has been set as part of the mapping function, the selectedIndex has been set during handleMenuItemClick() call
                    //^^^value===1 checks if we're on service page so it doesnt look like its hovered over
                    >
                        {option.name}
                    </MenuItem>
                ))}
                {/* <MenuItem classes={{root: classes.menuItem}} onClick={() => {handleClose(); setValue(1)}} component={Link} to="/services">Services</MenuItem>
                            <MenuItem classes={{root: classes.menuItem}} onClick={() => {handleClose(); setValue(1)}} component={Link} to="/customsoftware">Custom Software Development</MenuItem>
                            <MenuItem classes={{root: classes.menuItem}} onClick={() => {handleClose(); setValue(1)}} component={Link} to="/mobileapps">Mobile App Development</MenuItem>
                            <MenuItem classes={{root: classes.menuItem}} onClick={() => {handleClose(); setValue(1)}} component={Link} to="/websites">Website Development</MenuItem> */}
            </Menu>
        </React.Fragment>
    )

    const drawer = (
        <React.Fragment>
            <SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS} open={openDrawer}
                onClose={() => { setOpenDrawer(false) }}
                onOpen={() => { setOpenDrawer(true) }}
            >
                <List disablePadding>
                    {routes.map((route, index) => (
                        <ListItem
                            divider
                            button
                            key={`${route}${route.activeIndex}`}
                            component={Link}
                            to={route.link}
                            classes={{ root: classes.listItem }}
                            onClick={() => { setOpenDrawer(false); setValue(route.activeIndex); }}
                            selected={value === route.activeIndex}>
                            <ListItemText
                                className={value === route.activeIndex ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem}
                            >
                                {route.name}
                            </ListItemText>
                        </ListItem>
                    ))}

                </List>
            </SwipeableDrawer>
            <IconButton onClick={() => { setOpenDrawer(!openDrawer) }} disableRipple className={classes.drawerIconContainer}>
                <MenuIcon className={classes.drawerIcon} />
            </IconButton>

        </React.Fragment>
    )

    return (
        // fragment allows component to be rendered alongside the div
        <React.Fragment>
            <ElevationScroll>
                <AppBar position="fixed" color="primary" className={classes.appbarRoundedTest}>
                    {/* toolbar allows you to stack items horizontally */}
                    <Toolbar disableGutters>
                        <Button component={Link} to="/" className={classes.logoContainer} disableRipple>
                            <img src={logo} alt="company logo" className={classes.logo} />
                        </Button>

                        {matches ? drawer : tabs}
                        {/* if (matches === true) {
                                drawer
                            } else {
                                tabs
                            } */}

                        {/* <Typography variant="h3" color="secondary">Arc Development</Typography> */}

                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            {/* what this does, is give the div class the height of the AppBar  */}
            <div className={classes.toolbarMargin} />
        </React.Fragment>
    )

}