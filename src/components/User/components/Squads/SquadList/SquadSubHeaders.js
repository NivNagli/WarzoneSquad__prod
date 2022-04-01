import React from 'react';
import classes from './SquadSubHeaders.module.css';
const SquadSubHeaders = props => {
    return (
        <div className={classes.squad__general_info_div}>
            <span className={classes.squad__top}>{props.top}</span>
            <span className={classes.squad__bottom}>{props.bottom}</span>
        </div>
    );
};

export default SquadSubHeaders;