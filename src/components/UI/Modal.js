import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClickBackground}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClickBackground={props.onClickBackground} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onClickCancel={props.onHideCart}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </React.Fragment>
  );
};

export default Modal;
