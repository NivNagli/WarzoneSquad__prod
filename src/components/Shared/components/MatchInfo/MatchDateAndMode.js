import React from 'react';
import classes from './MatchDateAndMode.module.css';
const MatchDateAndMode = props => {
    return (
        <div className={classes.match_date_mode__div}>
            <span className={classes.match__date}>{props.date}</span>
            <span className={classes.match__mode}>{props.mode}</span>
        </div>
    );
};

export default MatchDateAndMode;