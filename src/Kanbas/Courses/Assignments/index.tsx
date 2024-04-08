import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle, FaStickyNote, FaTrash  } from "react-icons/fa";
import { Link, useParams, useNavigate  } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  setAssignment,
  setAssignments
} from "./reducer";
import { KanbasState } from "../../store";
import * as client from "./client";

function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    client.findAssignmentsForCourse(cid)
      .then((assignments) =>
        dispatch(setAssignments(assignments))
    );
  }, [cid]);

  
  const assignmentList = useSelector((state: KanbasState) => 
    state.assignmentsReducer.assignments);

  const assignment = useSelector((state: KanbasState) =>
    state.assignmentsReducer.assignment);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  //const [assignments, setAssignments] = useState(assignmentList);

  const confirmDeleteClick = () => {
    dispatch(deleteAssignment(assignment._id));
    setShowDeleteDialog(false);
  }

  const cancelDeleteClick = () => {
    setShowDeleteDialog(false);
  }

  const handleNewAssignment = () => {

    // create the assignmentId
    const aid = new Date().getTime().toString();

    // create a blank assignment to send to the API
    const a = {
      _id: aid, 
      course: cid, 
      title: "New Assignment", 
      description: "",
      points: "",
      dueDate: "",
      availableFromDate: "",
      availableUntilDate: "" 
    }

    // call the client createAssignment function 
    client.createAssignment(cid, a).then((a) => {

      // add the assignment to state
      dispatch(addAssignment(addAssignment));

      // set the current assingment to the new assignment
      dispatch(setAssignment(a));

      // navigate to the assingment editor
      navigate(`/Kanbas/Courses/${cid}/Assignments/${a._id}`);
    });
  };

  const handleDeleteAssignment = (assignmentId: string) => {
    console.log("Deleting assignment ", assignmentId)
    client.deleteAssignment(assignmentId).then((status) => {
      console.log(status)
      dispatch(deleteAssignment(assignmentId));
      setShowDeleteDialog(false);
    });
  };

  return (
    <div className="container">
      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <div>
            <FaEllipsisV className="me-2" />ASSIGNMENTS
            <span className="float-end">
              <FaCheckCircle className="text-success" />
              <FaPlusCircle className="ms-2" onClick={handleNewAssignment} />
              <FaEllipsisV className="ms-2" />
            </span>
          </div>
          <ul className="list-group">
            {assignmentList.map((assignment) => (
              <li className="list-group-item" key={assignment._id} onClick={() => dispatch(setAssignment(assignment))}>
                <FaEllipsisV className="me-2" />
                <FaStickyNote className="me-2 text-success" />
                <Link
                  onClick={() => dispatch(setAssignment(assignment))}
                   to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}>{assignment.title}</Link>
                <div className="float-end">
                  <FaCheckCircle className="text-success" />
                  <FaTrash className="ms-2 text-danger" onClick={() => setShowDeleteDialog(true)} />
                  <FaEllipsisV className="ms-2" /> 
                </div>
              </li>))}
          </ul>
        </li>
      </ul>

      {showDeleteDialog && 
        <div className="alert alert-warning">
          <h3>Are you sure you want to delete the "{assignment.title}" assignment?</h3>
          <button className="btn btn-success" onClick={() => handleDeleteAssignment(assignment._id)}>Yes</button>
          <button className="btn btn-danger" onClick={cancelDeleteClick}>No</button>
        </div>
      }
    </div>
);}

export default Assignments;