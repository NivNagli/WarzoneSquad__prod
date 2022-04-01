import React from 'react';
import classes from './Placement.module.css';
const Placement = props => {
    if (props.placement === 1 || props.placement === '1') {
        return (
            <div className={classes.match__placement}>
                <span className={classes.match__placement_won}>{props.placement}</span>
            </div>
        );
    }

    else if(props.placement === 2 || props.placement === '2') {
        return (
            <div className={classes.match__placement}>
                <span className={classes.match__placement_second}>{props.placement}</span>
            </div>
        );
    }

    else if(props.placement === 3 || props.placement === '3') {
        return (
            <div className={classes.match__placement}>
                <span className={classes.match__placement_third}>{props.placement}</span>
            </div>
        );
    }

    else {
        return (
            <div className={classes.match__placement}>
                <span className={classes.match__placement_lost}>{props.placement}</span>
            </div>
        );
    }
};

export default Placement;