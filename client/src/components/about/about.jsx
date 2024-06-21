import React from "react";
import "./about.css";
import Arrow from "./arrow.png";
import AboutContent from "./aboutContent";

function About() {
  return (
    <div className="adjust-about-container">
      <div className="about-container">
        {AboutContent.map((content, index) => {
          return (
            <div className={`matter-div matter-div-${index}`} id={index}>
              <div className="title">
                <img src={Arrow} alt="pointer" /> <h1>{content.title}</h1>
              </div>
              <div className="description">
                {content.description}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default About;
