import React from "react";

const Event = ({ id, title, desc, date, img }) => {
  const handleSignUp = (eventId) => {
    console.log("Signed up");
  };

  return (
    <>
      <div>
        <h1>
          {title}
          <span> {date}</span>
        </h1>
        <img src={img} alt="test"></img>
        <p>{desc}</p>
        <button onClick={() => handleSignUp(id)}>Sign Up</button>
      </div>
    </>
  );
};

export default Event;
