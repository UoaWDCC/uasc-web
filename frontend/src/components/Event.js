import React from "react";

const Event = (props) => {
  const handleSignUp = (eventId) => {
    console.log("Signed up");
  };

  return (
    <>
      <div>
        <h1>
          {props.title}
          <span> {props.date}</span>
        </h1>
        <img src={props.img} alt="test"></img>
        <p>{props.desc}</p>
        <button onClick={() => handleSignUp(props.id)}>Sign Up</button>
      </div>
    </>
  );
};

export default Event;
