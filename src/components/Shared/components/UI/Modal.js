import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from './Backdrop';
import classes from './Modal.module.css'

const ModalOverlay = props => {
  const content = (
    <div className={classes.modal} style={props.style}>
      <header className={classes.modal__header}>
        <h2>{props.header}</h2>
      </header>
      <div>
        <div className={classes.modal__content}>
          {props.children}
        </div>
      </div>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = props => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames={classes.modal}
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
