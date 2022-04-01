import React from 'react';
import classes from './SuccessMessage.module.css';

const SuccessMessage = props => {
    return (<div className={`${classes.success_message}`}>
        &#9888; {props.msg}
    </div>
    );
};

export default SuccessMessage;