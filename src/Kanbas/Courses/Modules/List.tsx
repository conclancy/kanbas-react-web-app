import React, { useState, useEffect } from "react";
import "./index.css";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import * as client from "./client";
import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
  setModules
} from "./reducer";
import { KanbasState } from "../../store";

function ModuleList() {

  const { cid } = useParams();

  useEffect(() => {
    client.findModulesForCourse(cid)
      .then((modules) =>
        dispatch(setModules(modules))
    );
  }, [cid]);


  const moduleList = useSelector((state: KanbasState) => 
    state.modulesReducer.modules);

  const module = useSelector((state: KanbasState) =>
    state.modulesReducer.module);

  const dispatch = useDispatch();

  const handleAddModule = () => {
    client.createModule(cid, module).then((module) => {
      dispatch(addModule(module));
    });
  };

  const handleDeleteModule = (moduleId: string) => {
    client.deleteModule(moduleId).then((status) => {
      dispatch(deleteModule(moduleId));
    });
  };

  const handleUpdateModule = async () => {
    const status = await client.updateModule(module);
    dispatch(updateModule(module));
  };


  return (
    <>
      {/* <!-- Add buttons here --> */}
      <ul className="list-group wd-modules">
      <li className="list-group-item">
        <button className="btn btn-primary" 
          onClick={handleAddModule}>
          Add
        </button>
        <button className="btn btn-secondary" 
          onClick={handleUpdateModule}>
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
                <span className="float-end">
                  <FaCheckCircle className="text-success" />
                  <FaPlusCircle className="ms-2" />
                  <FaEllipsisV className="ms-2" />
                </span>
                <button className="btn btn-danger"
                    onClick={() => handleDeleteModule(module._id)}>
                    Delete
                  </button>
                <button className="btn btn-success"
                  onClick={() => dispatch(setModule(module))}>
                  Edit
                </button>
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
