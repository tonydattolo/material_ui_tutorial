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
        marginBottom: "2em"
    },
    logo: {
        height: "7em"
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

    // tests
    appbarRoundedTest: {
        borderTopLeftRadius: "20px"
    }
}))


export default function Header(props) {

    // for styling
    const classes = useStyles()
    //for routing
    const [value, setValue] = useState(0);
    const handleChange = (e, value) => {
        setValue(value)
    }
    // for menu
    const [anchorEl, setAnchorEl] = useState(null) //this determines what state to store and what we want rendered, which in this case is the services tab
    const [open, setOpen] = useState(false) //determines visibility of the menu, displayed or not, setting to closed (false) to begin
    const handleClick = (e) => { //click event containing info on where we clicked on the screen
        setAnchorEl(e.currentTarget) //tells menu where we want it to be rendered
        setOpen(true)
    }
    const handleClose = (e) => {
        setAnchorEl(null)
        setOpen(false)
    }

    // for menu links
    const [selectedIndex, setSelectedIndex] = useState(0)

    //refactoring manu links that share code

    const menuOptions = [
        { name: "Services", link: "/services" },
        { name: "Custom Software Development", link: "/customsoftware" },
        { name: "Mobile App Devleopment", link: "/mobileapps" },
        { name: "Website Dev", link: "/websites" }
    ]

    const handleMenuItemClick = (e, i) => {
        setAnchorEl(null);
        setOpen(false);
        setSelectedIndex(i);
    }


    // allows routing to match with paths, content, active
    useEffect(() => {
        // if (window.location.pathname === "/" && value !== 0) {
        //     setValue(0)
        // } else if (window.location.pathname === "/services" && value !== 1) {
        //     setValue(1)
        // } else if (window.location.pathname === "/revolution" && value !== 2) {
        //     setValue(2)
        // } else if (window.location.pathname === "/about" && value !== 3) {
        //     setValue(3)
        // } else if (window.location.pathname === "/contact" && value !== 4) {
        //     setValue(4)
        // } else if (window.location.pathname === "/estimate" && value !== 5) {
        //     setValue(5)
        // }

        //refactoring
        switch (window.location.pathname) {
            case "/":
                if (value !== 0) {
                    setValue(0);
                }
                break;
            case "/services":
                if (value !== 1) {
                    setValue(1);
                    // setSelectedIndex(0)
                }
                break;
            case "/customsoftware":
                if (value !== 1) {
                    setValue(1);
                    setSelectedIndex(1);
                }
                break;
            case "/mobileapps":
                if (value !== 1) {
                    setValue(1);
                    setSelectedIndex(2);
                }
                break;
            case "/websites":
                if (value !== 1) {
                    setValue(1);
                    setSelectedIndex(3);
                }
                break;
            case "/revolution":
                if (value !== 2) {
                    setValue(2)
                }
                break;
            case "/about":
                if (value !== 3) {
                    setValue(3)
                }
                break;
            case "/contact":
                if (value !== 4) {
                    setValue(4)
                }
                break;
            case "/estimate":
                if (value !== 5) {
                    setValue(5)
                }
                break;
            default:
                break;
        }
    }, [value]);

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

                        {/* <Typography variant="h3" color="secondary">Arc Development</Typography> */}
                        <Tabs
                            className={classes.tabContainer}
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                        >
                            <Tab className={classes.tab} component={Link} to="/" label="Home" />
                            <Tab
                                className={classes.tab}
                                component={Link}
                                to="/services"
                                label="Services"
                                aria-owns={anchorEl ? "simple-menu" : undefined} //check if there is a non-null(or closed) anchorEl, then set aria-owns to simple-menu, otherwise make it undefined
                                area-haspopup={anchorEl ? "true" : undefined}
                                onMouseOver={event => handleClick(event)} //instead of onClick, allows hover-over menu popup
                            />

                            <Tab className={classes.tab} component={Link} to="/revolution" label="The Revolution" />
                            <Tab className={classes.tab} component={Link} to="/about" label="About Us" />
                            <Tab className={classes.tab} component={Link} to="/contact" label="Contact Us" />
                        </Tabs>
                        <Button variant="contained" color="secondary" className={classes.button}>
                            Free Estimate
                        </Button>
                        <Menu id="simple-menu" anchorEl={anchorEl} open={open} onClose={handleClose}
                            MenuListProps={{ onMouseLeave: handleClose }}
                            classes={{ paper: classes.menu }}
                            elevation={0}
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
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            {/* what this does, is give the div class the height of the AppBar  */}
            <div className={classes.toolbarMargin} />
        </React.Fragment>
    )

}