import React, { useState } from "react"
import "./hero.css"
import Globe from "../ui/globe"
import Modal from "../models/modal"
import TypeWrite from "../ui/typewrite"
import RobotGif from "./robot.gif"
import Bot from "../bot/bot.jsx"

function Hero(){

    var [openBot , setOpenBot] = useState(false)

    function handleOpenBot(){
        setOpenBot(true)
    }

    function handleCloseBot(){
        setOpenBot(false)
    }

    return(
        <React.Fragment>
            <Modal show={openBot}>
                <Bot close={handleCloseBot}/> 
            </Modal>
            <div className="hero">
                <div className="hero-title">
                    <h1>Generative AI</h1>
                </div>
                <div className="introduction">
                    <img src={RobotGif} alt="" />
                    <TypeWrite />
                </div>
                <div className="globe-3d">
                    <Globe />
                </div>
                <div className="chatbot-entry">
                    <button className="openbtn" onClick={handleOpenBot}>Chat with Zen</button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Hero