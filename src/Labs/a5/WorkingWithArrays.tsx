import React, { useState, useEffect } from "react";
import axios from "axios";

// create an interface since I am working in a tsx file
interface Todo {
    id: number;
    title: string;
    description: string;
    due: string;
    completed: boolean;
}

function WorkingWithArrays() {

    // create the API constant string
    const API = "http://localhost:4000/a5/todos";

    // create todo setter and initial state
    const [todo, setTodo] = useState<Todo>({
        id: 1,
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
    });

    // create todos array setter
    const [todos, setTodos] = useState<Todo[]>([]);

    // get request for todos
    const fetchTodos = async () => {
        const response = await axios.get(API);
        setTodos(response.data);
    };

    // get request for a specific todo
    const fetchTodoById = async (id: number) => {
        const response = await axios.get(`${API}/${id}`);
        setTodo(response.data);
    };

    // get request to update current todo title
    const updateTitle = async () => {
        const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`);
        setTodos(response.data);
    };
    
    // get request to create a todo
    const createTodo = async () => {
        const response = await axios.get(`${API}/create`);
        setTodos(response.data);
    };

    // get request to delete a todo
    const removeTodo = async (todo: Todo) => {
        const response = await axios
          .get(`${API}/${todo.id}/delete`);
        setTodos(response.data);
    };

    // post request to create a todo
    const postTodo = async () => {
        const response = await axios.post(API, todo);
        setTodos([...todos, response.data]);
    };    
    
    // load todos on page load
    useEffect(() => {
        fetchTodos();
    }, []);

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

        <div className="container">
            <button className="btn btn-primary"
                onClick={createTodo} >
                Create Todo
            </button>
            <button className="btn btn-success"
                onClick={updateTitle} >
                Update Title
            </button>


            <ul className="list-group">
                {todos.map((todo) => (
                    <li className="list-group-item" key={todo.id}>
                        {todo.title}
                        <button className="btn btn-danger"
                            onClick={() => removeTodo(todo)}>
                            Remove
                        </button>
                        <button className="btn btn-warning"
                            onClick={() => fetchTodoById(todo.id)} >
                            Edit
                        </button>
                    </li>
                ))}
            </ul>
        </div>


      </div>
    );
}

export default WorkingWithArrays;