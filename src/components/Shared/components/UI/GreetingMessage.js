import React from 'react';
import classes from './GreetingMessage.module.css';

const GreetingMessage = props => {
    return (
        <div className={classes.greeting_message__div}>
            <p className={classes.greeting_message__title}>{props.title}</p>
            <p className={classes.greeting_message__main}>{props.message}</p>
            <p className={classes.greeting_message__main_sub}>{props.subMessage}</p>
        </div>
    );
};

export default GreetingMessage;