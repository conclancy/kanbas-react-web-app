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

    // create error message setter
    const [errorMessage, setErrorMessage] = useState(null);

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

    // delete todo
    const deleteTodo = async (todo: Todo) => {
        try {
            const response = await axios.delete(`${API}/${todo.id}`);
            setTodos(todos.filter((t) => t.id !== todo.id));
        } catch (error: any) {
            console.log(error);
            setErrorMessage(error.response.data.message);
        }  
    };

    // update todo
    const updateTodo = async () => {
        try{
            const response = await axios.put(`${API}/${todo.id}`, todo);
            setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
        } catch (error: any) {
            console.log(error);
            setErrorMessage(error.response.data.message);
        }
    };
    
    
    // load todos on page load
    useEffect(() => {
        fetchTodos();
    }, []);

    return (
      <div className="container">
        <h3>Working with Arrays</h3>

        <input className="form-control" 
            value={todo.id} readOnly />
        <input className="form-control" 
            onChange={(e) => setTodo({ ...todo })}
            value={todo.title} type="text" />
        <textarea className="form-control" 
            value={todo.description}
            onChange={(e) => setTodo({ ...todo,
            description: e.target.value })} />
        <input className="form-control"  
            value={todo.due} type="date"
            onChange={(e) => setTodo({
            ...todo, due: e.target.value })} />
        <div className="form-check">
            <input className="form-check-input"
                checked={todo.completed} type="checkbox"
                onChange={(e) => setTodo({
                    ...todo, completed: e.target.checked })}
            />
            <label className="form-check-label">Completed</label>
        </div>

        <div className="container">
            <button className="btn btn-warning"
                onClick={postTodo}> 
                Post Todo 
            </button>
            <button className="btn btn-success" 
                onClick={updateTodo}>
                Update Todo
            </button>
            <button className="btn btn-primary"
                onClick={createTodo} >
                Create Todo
            </button>
            {/* <button className="btn btn-success"
                onClick={updateTitle} >
                Update Title
            </button> */}

            {errorMessage && (
                    <div className="alert alert-danger mb-2 mt-2">
                    {errorMessage}
                    </div>
            )}

            <ul className="list-group">
                {todos.map((todo) => (
                    <li className="list-group-item" key={todo.id}>
                        <input checked={todo.completed}
                            type="checkbox" readOnly />
                        {todo.title}
                        <p>{todo.description}</p>
                        <p>{todo.due}</p>

                        <button onClick={() => deleteTodo(todo)}
                            className="btn btn-danger float-end ms-2">
                            Remove
                        </button>
                        <button className="btn btn-warning float-end ms-2"
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