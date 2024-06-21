import React from "react"
import ReactDOM from "react-dom"
import Backdrop from "../backdrop/backdrop.jsx"
import { CSSTransition } from "react-transition-group"
import "./errorModel.css"

function ErrorModelOverlay(props){
    const content=(
        <div className={`modal ${props.className}`} style={props.style}>
            <header className={`modal__header ${props.headerClass}`}>
                <h2>{props.header}</h2>
            </header>
            <form onSubmit={props.onSubmit?props.onSubmit:(event)=>event.preventDefault()}>
                <div className={`modal__content ${props.contentClass}`}>
                    {props.children}
                </div>
                <footer className={`modal__footer ${props.footerClass}`}>
                    {props.footer}
                </footer>
            </form>
        </div>
    )

    return ReactDOM.createPortal(content,document.getElementById("error-hook"))
}

function ErrorModel(props){
    return <React.Fragment>
        {props.show && <Backdrop close = {props.onCancel}/>}
        <CSSTransition in={props.show} mountOnEnter unmountOnExit timeout={200} classNames="modal">
            <ErrorModelOverlay {...props}/>
        </CSSTransition>
        
    </React.Fragment>
}

export default ErrorModel