import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import logo from '../../assets/logo.svg'

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Button from '@material-ui/core/Button';

import { Link } from "react-router-dom";


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

const useStyles = makeStyles(theme => ({
    toolbarMargin: {
        // need this to fix hidden text behind bar
        ...theme.mixins.toolbar,
        marginBottom: "2em"
    },
    logo: {
        height: "7em"
    },
    logoContainer:{
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
    }
}))


export default function Header(props) {

    const classes = useStyles()

    const [value, setValue] = useState(0);
    const handleChange = (e, value) => {
        setValue(value)
    }

    useEffect(() => {
        if (window.location.pathname === "/" && value !== 0) {
            setValue(0)
        } else if (window.location.pathname === "/services" && value !== 1) {
            setValue(1)
        } else if (window.location.pathname === "/revolution" && value !== 2) {
            setValue(2)
        } else if (window.location.pathname === "/about" && value !== 3) {
            setValue(3)
        } else if (window.location.pathname === "/contact" && value !== 4) {
            setValue(4)
        } else if (window.location.pathname === "/estimate" && value !== 5) {
            setValue(5)
        }
    }, [value]);

    return (
        // fragment allows component to be rendered alongside the div
        <React.Fragment>
            <ElevationScroll>
                <AppBar position="fixed" color="primary">
                    {/* toolbar allows you to stack items horizontally */}
                    <Toolbar disableGutters>
                        <Button component={Link} to="/" className={classes.logoContainer} disableRipple>
                            <img src={logo} alt="company logo" className={classes.logo}/>
                        </Button>

                        {/* <Typography variant="h3" color="secondary">Arc Development</Typography> */}
                        <Tabs
                            className={classes.tabContainer}
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                        >
                            <Tab className={classes.tab} component={Link} to="/" label="Home" />
                            <Tab className={classes.tab} component={Link} to="/services" label="Services" />
                            <Tab className={classes.tab} component={Link} to="/revolution" label="The Revolution" />
                            <Tab className={classes.tab} component={Link} to="/about" label="About Us" />
                            <Tab className={classes.tab} component={Link} to="/contact" label="Contact Us" />
                        </Tabs>
                        <Button variant="contained" color="secondary" className={classes.button}>
                            Free Estimate
                        </Button>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            {/* what this does, is give the div class the height of the AppBar  */}
            <div className={classes.toolbarMargin} />
        </React.Fragment>
    )

}