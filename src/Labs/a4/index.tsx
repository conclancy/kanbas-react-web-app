import React from "react";
import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import EventObject from "./EventObject";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import ReduxExamples from "./ReduxExamples";
import { useSelector } from "react-redux";
import { LabState } from "../store";

const Assignment4 = () => {
  function sayHello() {
    alert("Hello");
  }
  const { todos } = useSelector((state: LabState) => state.todosReducer);

  return(
    <>
      <h1>Assignment 4</h1>
      <ReduxExamples/>
      <PassingFunctions theFunction={sayHello} />
      <ClickEvent/>
      <PassingDataOnEvent/>
      <EventObject/>
      <Counter/>
      <BooleanStateVariables/>
      <StringStateVariables/>
      <DateStateVariable/>
      <ObjectStateVariable/>
      <ArrayStateVariable/>
      <ParentStateComponent/>
      
      <h1>Redux Todo:</h1>
      <ul className="list-group">
        {todos.map((todo) => (
          <li className="list-group-item" key={todo.id}>
            {todo.title}
          </li>
        ))}
      </ul>

    </>
  );
};

export default Assignment4;