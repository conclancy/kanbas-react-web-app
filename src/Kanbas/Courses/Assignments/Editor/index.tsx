import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateAssignment } from "../reducer";
import { KanbasState } from "../../../store";

function AssignmentEditor() {

  const dispatch = useDispatch();

  const assignment = useSelector((state: KanbasState) =>
    state.assignmentsReducer.assignment);
  
  const { cid }  = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState(assignment.title);
  const [description, setDescription] = useState(assignment.description);
  const [points, setPoints] = useState(assignment.points);
  const [dueDate, setDueDate] = useState(assignment.dueDate);
  const [availDate, setAvailDate] = useState(assignment.availableFromDate);
  const [untilDate, setUntilDate] = useState(assignment.availableUntilDate);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  }

  const handlePointsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPoints(event.target.value);
  }

  const handleDueDateChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(event.target.value);
  }

  const handleAFromDateChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
    setAvailDate(event.target.value);
  }

  const handleAUntilDateChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
    setUntilDate(event.target.value);
  }

  const handleSave = () => {
    // Dispatch an action to update the assignment in the Redux store
    dispatch(updateAssignment({ 
      ...assignment, 
      title: title,
      description: description, 
      points: points,
      dueDate: dueDate,
      availableFromDate: availDate,
      availableUntilDate: untilDate,
   }));

    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };


  return (
    <div className="container">
      <h2>Assignment Editor</h2>
      <h3>Assingment ID: {assignment._id}</h3>
      <form>
        <div className="form-group">
          <label htmlFor="assignmentTitle">Assignment Title</label>
          <input type="text" className="form-control" id="assignmentTitle" placeholder="Enter Assignment Title" value={title} onChange={handleTitleChange}></input>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" id="assignmentDescription" placeholder="Enter Assignment Description" value={description} onChange={handleDescChange}></input>
        </div>
        <div className="form-group">
          <label htmlFor="assignmentPoints">Points</label>
          <input type="number" className="form-control" id="assignmentPoints" placeholder="0" value={points} onChange={handlePointsChange}></input>
        </div>
        <div className="form-group">
          <label htmlFor="assignmentDueDate">Due Date</label>
          <input type="date" className="form-control" id="assignmentDueDate" value={dueDate} onChange={handleDueDateChange}></input>
        </div>
        <div className="form-group">
          <label htmlFor="availableFrom">Available From</label>
          <input type="date" className="form-control" id="availableFrom" value={availDate} onChange={handleAFromDateChange}></input>
        </div>
        <div className="form-group">
          <label htmlFor="availableUntil">Until</label>
          <input type="date" className="form-control" id="availableUntil" value={untilDate} onChange={handleAUntilDateChange}></input>
        </div>
      </form>

      <div className="container float-end">
        <button onClick={handleSave} className="btn btn-success ms-2">
          Save
        </button>
        <Link to={`/Kanbas/Courses/${cid}/Assignments`}
              className="btn btn-danger">
          Cancel
        </Link>
      </div>
      
    </div>
  );
}

export default AssignmentEditor;