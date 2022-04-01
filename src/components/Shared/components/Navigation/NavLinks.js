import { NavLink } from 'react-router-dom';
import React from 'react';
import classes from './NavLinks.module.css';
import Button from '../Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../../../store/auth';
import { useHistory } from 'react-router-dom'

const NavLinks = props => {
    /* As the same sounds like this component is responsible for the navigation links,
     * There are two display options one for unregistered user, and the second for registered user. */

    /* Using our redux to access the 'isAuthenticated' state which determine if the user is 
     * authenticated or not, and the links will be displayed accordingly. */
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isAuthenticated);

    const history = useHistory();
    const onLogout = () => {
        // The function for the logout button, we are using the 'logout' method from the redux slice 'auth'.
        dispatch(authActions.logout());
        history.push("/");
    };
    return (
        <React.Fragment>
            <div className={classes.nav_links}>
                <ul className={classes.nav_list}>
                    <li>
                        <NavLink className={classes.nav__link} to="/Compare-Search" exact>
                            Compare
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={classes.nav__link} to="/Player-Search" exact>
                            Search
                        </NavLink>
                    </li>
                    {isLoggedIn && (
                        <NavLink className={classes.nav__link} to="/Player-Profile" exact>
                            Profile
                        </NavLink>
                    )}
                </ul>
            </div>

            <div className={classes.nav_buttons}>
                {!isLoggedIn && (
                    <Button to={'/Login'} parentClass={classes.button}>Login</Button>
                )}

                {!isLoggedIn && (
                    <Button to={'/Signup'} parentClass={classes.button}>Signup</Button>
                )}
                {isLoggedIn && (
                    <Button parentClass={classes.button} onClick={onLogout}>Logout</Button>
                )}
            </div>

        </React.Fragment>
    );
};

export default NavLinks;