import React from 'react';
import classes from './MatchBasicInfo.module.css';
const MatchBasicInfo = props => {
    if(props.bottom) {
        return (
            <div className={classes.match__info}>
                <span className={classes.match__top}>{props.top}</span>
                <span className={classes.match__bottom}>{props.bottom}</span>
            </div>
        );
    }
    else {
        return (
            <div className={classes.match__info}>
                <span className={classes.match__top}>{props.top}</span>
            </div>
        );
    }

};

export default MatchBasicInfo;