import React from 'react'
import {ReactTyped} from "react-typed"

function TypeWrite() {
  const transition = {type:'spring',duration:3} 

  return (
      <h1>Hi i am <span style={{color:"red"}}>ZEN</span> {" "}
      <ReactTyped
          strings={["a Human Assistant", "a Knowledgeable", "an Adaptive"]}
          typeSpeed={120}
          loop
          backSpeed={80}
          showCursor={true}/>
      </h1>
  )
}

export default TypeWrite