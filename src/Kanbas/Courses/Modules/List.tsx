import React, { useState } from "react";
import "./index.css";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
} from "./reducer";
import { KanbasState } from "../../store";

function ModuleList() {

  const { cid } = useParams();

  const moduleList = useSelector((state: KanbasState) => 
    state.modulesReducer.modules);
  const module = useSelector((state: KanbasState) =>
    state.modulesReducer.module);
  const dispatch = useDispatch();

  {/*
  const [selectedModule, setSelectedModule] = useState(moduleList[0]);

  

  const [module, setModule] = useState({
    _id: "",
    name: "New Module",
    description: "New Description",
    course: cid,
  });

  // append new module at beginning of list
  const addModule = (module: any) => {
    const newModule = { ...module,
      _id: new Date().getTime().toString() };
    const newModuleList = [newModule, ...moduleList];
    setModuleList(newModuleList);
  };

  // delete a module by ID
  const deleteModule = (moduleId: string) => {
    const newModuleList = moduleList.filter(
      (module) => module._id !== moduleId );
    setModuleList(newModuleList);
  };

  // edit module by ID 
  const updateModule = () => {
    const newModuleList = moduleList.map((m) => {
      if (m._id === module._id) {
        return module;
      } else {
        return m;
      }
    });
    setModuleList(newModuleList);
  };
  */}

  return (
    <>
      {/* <!-- Add buttons here --> */}
      <ul className="list-group wd-modules">
      <li className="list-group-item">
        <button className="btn btn-primary" 
          onClick={() => dispatch(addModule({ ...module, course: cid }))}>
          Add
        </button>
        <button className="btn btn-secondary" 
          onClick={() => dispatch(updateModule(module))}>
          Update
        </button>
        <input className="form-control" value={module.name}
          onChange={(e) => dispatch(setModule({ ...module, name: e.target.value }))}
        />
        <textarea className="form-control" value={module.description}
          onChange={(e) => setModule(dispatch(setModule({ ...module, description: e.target.value })))}
        />
      </li>
        {moduleList
          .filter((module) => module.course === cid)
          .map((module) => (    
            <li
              className="list-group-item"
              onClick={() => dispatch(setModule(module))}
              key={module._id}>
              
              <div>
                <FaEllipsisV className="me-2" />
                {module.name}
                <div className="float-end">
                  <button className="btn btn-danger"
                    onClick={() => dispatch(deleteModule(module._id))}>
                    Delete
                  </button>
                  <button className="btn btn-success"
                    onClick={() => dispatch(setModule(module))}>
                    Edit
                  </button>
                  <FaCheckCircle className="text-success" />
                  <FaPlusCircle className="ms-2" />
                  <FaEllipsisV className="ms-2" />
                </div>
              </div>
              <div>
                {module.description}
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}
export default ModuleList;
