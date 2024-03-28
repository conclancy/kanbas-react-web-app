import React, { useState, ChangeEvent, useEffect } from "react";

function WorkingWithArrays() {
    const API = "http://localhost:4000/a5/todos";
    const [todo, setTodo] = useState({
        id: 1,
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
    });

    return (
      <div className="container">
        <h3>Working with Arrays</h3>

        <h4>Retrieving Arrays</h4>
        <a className="btn btn-primary" id="3.3.1"
            href={API}>
          Get Todos
        </a>

        <h4>Retrieving an Item from an Array by ID</h4>
        <input className="form-control"
            value={todo.id}
            onChange={(e) => setTodo({ ...todo,
            id: parseInt(e.target.value) })}/>
        <a className="btn btn-primary" 
            href={`${API}/${todo.id}`}>
            Get Todo by ID
        </a>

        <h3>Filtering Array Items</h3>
        <a className="btn btn-primary" id="3.3.2"
            href={`${API}?completed=true`}>
            Get Completed Todos
        </a>

        <h3>Creating new Items in an Array</h3>
        <a className="btn btn-primary" id="3.3.4"
            href={`${API}/create`}>
            Create Todo
        </a>

        <h3>Deleting from an Array</h3>
        <a className="btn btn-primary" id="3.3.5"
            href={`${API}/${todo.id}/delete`}>
            Delete Todo with ID = {todo.id}
        </a>

        <h3>Updating an Item in an Array</h3>
        <input 
            className="form-control"
            type="text" 
            value={todo.title}
            onChange={(e) => setTodo({
            ...todo, title: e.target.value })}/>
        <a className="btn btn-primary"
            href={`${API}/${todo.id}/title/${todo.title}`} >
            Update Title to {todo.title}
        </a>


        
        <h3>Updating Complete Flag</h3>
        <input
            id="completed"
            type="checkbox"
            checked={todo.completed}
            // onChange={handleCompletedChange}
            onChange={(e) => setTodo({
                ...todo, completed: Boolean(e.target.value) })}
            />
        <label htmlFor="completed">Completed</label>
        <br/>
        <a className="btn btn-primary"
            href={`${API}/${todo.id}/completed/${todo.completed}`} >
            Update Completed {todo.completed}
        </a>

        <h3>Updating Description</h3>
        <textarea 
            className="form-control"
            value={todo.description}
            onChange={(e) => setTodo({
            ...todo, description: e.target.value })}/>
        <a className="btn btn-primary"
            href={`${API}/${todo.id}/description/${todo.description}`} >
            Update description
        </a>

      </div>
    );
}

export default WorkingWithArrays;