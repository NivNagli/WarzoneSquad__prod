import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Button.module.css';

const Button = props => {
  // parentClass not necessarily the same class of the parent but the intention that it comes from the parent...
  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        className={classes.button + " " + props.parentClass}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={classes.button + " " + props.parentClass}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
