import React from "react"
import ReactDOM from "react-dom"
import "./backdrop.css"

function Backdrop(props){

    const content = (
        <div onClick={props.close} className="backdrop-div"></div>
    )

    return(
        ReactDOM.createPortal(content,document.getElementById("backdrop-hook"))
    )
}

export default Backdrop