import React, { useEffect, useState } from "react";
import axios from "axios";

function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });
    const ASSIGNMENT_URL = "http://localhost:4000/a5/assignment"

    const [module, setModule] = useState({
        id: 0,
        name: "My First Object",
        description: "Create an object with NodeJS",
        course: "CS5610"
    });
    const MODULE_URL = "http://localhost:4000/a5/module"

    const fetchAssignment = async () => {
        const response = await axios.get(`${ASSIGNMENT_URL}`);
        setAssignment(response.data);
    };

    const updateTitle = async () => {
        const response = await axios
          .get(`${ASSIGNMENT_URL}/title/${assignment.title}`);
        setAssignment(response.data);
    };
      
    useEffect(() => {
        fetchAssignment();
    }, []);
    
    return (
        <div className="container">
            <div className="row" id="3.2.1">
                <div className="col">
                <h3>Working With Objects</h3>

                <h3>Modifying Properties</h3>
                <input className="form-control"
                    onChange={(e) => setAssignment({
                        ...assignment, title: e.target.value })}
                    value={assignment.title} type="text" />
                <button className="btn btn-primary"
                    onClick={updateTitle} >
                    Update Title to: {assignment.title}
                </button>
                <button className="btn btn-primary" 
                    onClick={fetchAssignment} >
                    Fetch Assignment
                </button>


                <h4>Modifying Properties</h4>
                <a className="btn btn-primary"
                    href={`${ASSIGNMENT_URL}/title/${assignment.title}`}>
                    Update Title
                </a>
                <input type="text" className="form-control"
                    onChange={(e) => setAssignment({ ...assignment,
                        title: e.target.value })}
                    value={assignment.title}/>
                <h4>Retrieving Objects</h4>
                <a className="btn btn-primary"
                    href="http://localhost:4000/a5/assignment">
                    Get Assignment
                </a>
                <h4>Retrieving Properties</h4>
                <a className="btn btn-primary"
                    href="http://localhost:4000/a5/assignment/title">
                    Get Title
                </a>
                </div>
            </div>
            <div className="row" id="3.2.1">
                <div className="col">
                    <h4>Modifying Properties</h4>
                    <a className="btn btn-primary"
                        href={`${MODULE_URL}/name/${module.name}`}>
                        Update Name
                    </a>
                    <input type="text" className="form-control"
                        onChange={(e) => setModule({ ...module,
                            name: e.target.value })}
                        value={module.name}/>
                    <h4>Retrieving Objects</h4>
                    <a className="btn btn-primary"
                        href="http://localhost:4000/a5/module">
                        Get Module
                    </a>
                    <h4>Retrieving Properties</h4>
                    <a className="btn btn-primary"
                        href="http://localhost:4000/a5/module/name">
                        Get Name
                    </a>
                </div>
            </div>
        </div>
    );
}
export default WorkingWithObjects;