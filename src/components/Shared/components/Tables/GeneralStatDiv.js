import React from 'react';
import classes from './GeneralStatDiv.module.css';
const GeneralStatDiv = props => {
    // Simple div for display general stat.
    return (
        <div className={classes.stat}>
            <span className={classes.stat__header}>{props.header}</span>
            <span className={classes.stat__value}>{props.value}</span>
        </div>
    );
};

export default GeneralStatDiv;