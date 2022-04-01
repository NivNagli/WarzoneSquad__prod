import React from 'react';
import classes from './ErrorMessage.module.css';

const ErrorMessage = props => {
    return (<div className={`${classes.error_message}`}>
        {props.error}
    </div>
    );
};

export default ErrorMessage;