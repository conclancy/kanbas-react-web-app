import React from "react";
import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import EventObject from "./EventObject";

const Assignment4 = () => {
  function sayHello() {
    alert("Hello");
  }

  return(
    <>
      <h1>Assignment 4</h1>
      <PassingFunctions theFunction={sayHello} />
      <ClickEvent/>
      <PassingDataOnEvent/>
      <EventObject/>
    </>
  );
};

export default Assignment4;