import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAssignment, updateAssignment } from "../reducer";
import { KanbasState } from "../../../store";
import * as client from "../client";

function AssignmentEditor() {

  const dispatch = useDispatch();
  
  const { cid, assignmentId }  = useParams();

  useEffect(() => {
    client.findAssignment(assignmentId)
      .then((assignment) =>
        dispatch(setAssignment(assignment))
    );
  }, [assignmentId]);

  const assignment = useSelector((state: KanbasState) =>
    state.assignmentsReducer.assignment);

  const navigate = useNavigate();

  const handleSave = async () => {
    await client.updateAssignment(assignment).then((status) => {
      dispatch(updateAssignment(assignment));
      navigate(`/Kanbas/Courses/${cid}/Assignments`);
    });
  };


  return (
    <div className="container">
      <h2>Assignment Editor</h2>
      <h3>Assingment ID: {assignment._id}</h3>
      <form>
        <div className="form-group">
          <label htmlFor="assignmentTitle">Assignment Title</label>
          <input 
            type="text" 
            className="form-control" 
            id="assignmentTitle" 
            placeholder="Enter Assignment Title" 
            value={assignment.title} 
            onChange={(e) => dispatch(setAssignment({ ...assignment, title: e.target.value }))} 
          />
        </div>
        <div className="form-group">
          <input 
            type="text" 
            className="form-control" 
            id="assignmentDescription" 
            placeholder="Enter Assignment Description" 
            value={assignment.description} 
            onChange={(e) => dispatch(setAssignment({ ...assignment, description: e.target.value }))} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="assignmentPoints">Points</label>
          <input 
            type="number" 
            className="form-control" 
            id="assignmentPoints" 
            placeholder="0" 
            value={assignment.points} 
            onChange={(e) => dispatch(setAssignment({ ...assignment, points: e.target.value }))} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="assignmentDueDate">Due Date</label>
          <input 
            type="date" 
            className="form-control" 
            id="assignmentDueDate" 
            value={assignment.dueDate} 
            onChange={(e) => dispatch(setAssignment({ ...assignment, dueDate: e.target.value }))} 
        />
        </div>
        <div className="form-group">
          <label htmlFor="availableFrom">Available From</label>
          <input 
            type="date" 
            className="form-control" 
            id="availableFrom" 
            value={assignment.availDate} 
            onChange={(e) => dispatch(setAssignment({ ...assignment, availDate: e.target.value }))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="availableUntil">Until</label>
          <input 
            type="date" 
            className="form-control" 
            id="availableUntil" 
            value={assignment.untilDate} 
            onChange={(e) => dispatch(setAssignment({ ...assignment, untilDate: e.target.value }))} 
        />
        </div>
      </form>

    
      <button onClick={handleSave} className="btn btn-success ms-2 float-end">
        Save
      </button>
      <Link to={`/Kanbas/Courses/${cid}/Assignments`}
            className="btn btn-danger float-end">
        Cancel
      </Link>
    </div>
  );
}

export default AssignmentEditor;