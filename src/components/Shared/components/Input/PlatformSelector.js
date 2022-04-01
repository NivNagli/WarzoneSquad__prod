import React from 'react';
import classes from './PlatformSelector.module.css';
const PlatformSelector = props => {
    const onChangeHandler = (event) => {
        props.selectChanged(event);
    }

    return (
        <React.Fragment>
        <div className={props.center ? classes.platform_div : ""}>
        <select className={classes.platform_select}  onChange={onChangeHandler}>
            <option value="psn">Playstation</option>
            <option value="xbox">Xbox</option>
            <option value="battle">Battle.net</option>
        </select>
        </div>
        </React.Fragment>
    );
};

export default PlatformSelector;