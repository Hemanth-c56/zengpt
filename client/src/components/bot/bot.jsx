import React, { useContext, useEffect, useRef, useState } from "react"
import {AuthContext} from '../context/auth-context.jsx'
import {ReactTyped} from "react-typed"
import "./bot.css"
import run from "../gemini/gemini";
import {useDispatch} from "react-redux"
import { updateHistory } from "../../redux/actions/index.js";
import SendImg from "./send.png"
import darkMode from "./darkMode.png"
import lightMode from "./lightMode.png"
//"hi", "hello , how can i help you", "full form of GPT", "Generative Pretrained Transformer"
const Bot = (props)=>{

    const auth = useContext(AuthContext);
    const dispatch = useDispatch();

    const [prompt, setPrompt] = useState("")
    const [chats, setChats] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [isDarkMode, setIsDarkMode] =  useState(false);
    const [showResult, setShowResult] = useState(false)

    const bottomOfPanel = useRef(null);

    useEffect(()=>{
        if(bottomOfPanel.current){
            bottomOfPanel.current.scrollIntoView();
        }
    },[chats])

    const handleInputChange = (event)=>{
        setPrompt(event.target.value);
    }

    const handlePromptSubmit = async(event)=>{
        event.preventDefault();  
        
        if(prompt.length !== 0 || event.target.id === "default"){  
            let response;
            setShowResult(true) 
            setIsLoading(true)

            if(event.target.id){
                if(auth.userId){
                    dispatch(updateHistory(event.target.innerHTML,auth.userId))
                }
                setChats(prev =>{ return [...prev, event.target.innerHTML]});
                response = await run(event.target.innerHTML)
            }
            else{
                if(auth.userId){
                    dispatch(updateHistory(prompt,auth.userId))
                }
                setChats(prev =>{ return [...prev, prompt]});
                response = await run(prompt)
            }
            setChats(prev =>{ return [...prev, response]})
            setIsLoading(false)
            setPrompt("")
        }
    }

    return(
        <div className="chatbot-section" style={isDarkMode? {backgroundColor: "black"} : {backgroundColor: "white"}}>
            <div className="chatbot-header">
                <button className="closebtn" style={isDarkMode? {color: "black", backgroundColor: "white"}: null} onClick={props.close}>X</button>
                <div>
                    <img onClick={()=>{setIsDarkMode(prev=>!prev)}} className="mode-icons" src={isDarkMode? lightMode : darkMode} alt="" />
                </div>
            </div>
            <div className="chatbot-border">
                <div className="chatbot-container">
                    {showResult ?
                        <div className="chat-area">
                            {chats.map((chat, index)=>{
                                if(index%2 === 0){
                                    return(
                                    <div className="chat-bot-prompt" style={isDarkMode? {color : "white", border : "2px solid grey", borderBottom: "none"}: {color: "black"}}>
                                        <img src="https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png" className="user-icon" alt="" />                 
                                            {chat}
                                    </div> 
                                    )
                                }
                                else{
                                    return(
                                        <div className="chat-box-response" style={isDarkMode? {border : "2px solid grey", borderTop : "none"}: null} key={index}>
                                            <div><img src="https://developers.google.com/static/focus/images/gemini-icon.png" className="gemini-icon" alt="" /></div>    
                                            <ReactTyped
                                                className={isDarkMode ? "chat-response-text-light" : "chat-response-text-dark"}
                                                strings={[chat]}
                                                typeSpeed={5}
                                                showCursor={false}/>
                                        </div>
                                    )
                                }
                                
                            })}  
                            <div ref={bottomOfPanel} className={isLoading? "loader" : null}>
                                {isLoading &&  <>
                                    <hr />
                                    <hr />
                                    <hr />
                                    </>
                                }    
                            </div>           
                        </div> 
                        : 
                        <div className="chat-area-default">
                            <div className="default-1" id="default" style={isDarkMode? {color : "white", border : "2px solid grey"}: {color: "black"}} onClick={handlePromptSubmit}>Tell me about Vidya Jyothi Institute of Technology college</div>
                            <div className="default-2" id="default" style={isDarkMode? {color : "white", border : "2px solid grey"}: {color: "black"}} onClick={handlePromptSubmit}>Tell me a joke.</div>
                        </div>
                    }
                    
                    <div className="input-area">
                        <form className="search-form" onSubmit={handlePromptSubmit}>
                            <input id="search-input" value={prompt} onChange={handleInputChange} type="text" placeholder="Enter your prompt" />
                            <button id="search-submit-btn" type="submit">
                                <img className="send-img" src={SendImg} alt="Submit" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bot