import React from "react"
import ReactDOM from "react-dom"
import "./modal.css"
import { CSSTransition } from "react-transition-group";

function Modal(props){

    const content=(
        <CSSTransition
            in={props.show}
            timeout={1000}
            classNames="slide-in-left"
            mountOnEnter
            unmountOnExit
        >
        <aside className="modal-drawer">{props.children}</aside>
        </CSSTransition>
    );

    return( ReactDOM.createPortal(content , document.getElementById("modal-hook")))
}

export default Modal