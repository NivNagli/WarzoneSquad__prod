import NavLinks from './NavLinks';
import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';
const MainNavigation = props => {
    /* This component is the main navigation of the application, which will be on the top of the page,
     * it contains the main logo for the site and the 'NavLink' and 'NavLinks' components
     * for the internal links to the site pages. */
    return (
        <React.Fragment>
            {
                <nav className={classes.navbar}>
                    <div>
                        <h1 >
                            <NavLink className={classes.navbar__link} to="/">
                                <div className={classes.logo_holder}>
                                    <h3>Warzone</h3>
                                    <p>Squad</p>
                                </div>
                            </NavLink>
                        </h1>
                    </div>
                    <NavLinks />
                </nav>
            }
        </React.Fragment>
    );
};
export default MainNavigation;