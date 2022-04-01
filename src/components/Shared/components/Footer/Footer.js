import React from 'react';

import classes from './Footer.module.css';
import { NavLink } from 'react-router-dom';

const Footer = props => {
    /* This component is the footer of our application, will include links and information relevant to the site. */
    return (
        <div className={classes.footer}>
            <ul>
                <li><a rel="noopener noreferrer" href="https://www.facebook.com/nivnagli/" target="_blank"><i className="fa fa-facebook fa-fw"></i></a></li>
                <li><a rel="noopener noreferrer" href="https://twitter.com/WarzoneSquad/" target="_blank"><i className="fa fa-twitter fa-fw"></i></a></li>
                <li><a rel="noopener noreferrer" href="https://github.com/NivNagli" target="_blank"><i className="fa fa-github fa-fw"></i></a></li>
                <li><a rel="noopener noreferrer" href="https://www.linkedin.com/in/niv-nagli-59204b208/" target="_blank"><i className="fa fa-linkedin fa-fw"></i></a></li>
                <li>
                    <NavLink className="fa fas fa-copyright fa-fw" to="/"></NavLink>
                </li>
                
            </ul>
            <p>WarzoneSquad Written By Niv Nagli,<br></br>
            Activision has not endorsed and is not responsible for this site or its content.
            </p>
            
        </div>
    );
};


export default Footer;