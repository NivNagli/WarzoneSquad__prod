import React from 'react';
import classes from './SquadBasicInfo.module.css';
const SquadBasicInfo = props => {
    if(props.bottom) {
        return (
            <div className={classes.squad__info}>
                <span className={classes.squad__top}>{props.top}</span>
                <span className={classes.squad__bottom}>{props.bottom}</span>
            </div>
        );
    }
    else {
        return (
            <div className={classes.squad__info}>
                <span className={classes.squad__top}>{props.top}</span>
            </div>
        );
    }

};

export default SquadBasicInfo;