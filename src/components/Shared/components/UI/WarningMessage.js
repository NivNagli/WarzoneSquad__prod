import React from 'react';
import classes from './WarningMessage.module.css';

const WarningMessage = props => {
    return (<div className={`${classes.warning_message}`}>
        {props.msg}
    </div>
    );
};

export default WarningMessage;