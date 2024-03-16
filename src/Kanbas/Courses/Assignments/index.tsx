import React, { useState } from "react";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle, FaStickyNote, FaTrash  } from "react-icons/fa";
import { Link, useParams, useNavigate  } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  setAssignment,
} from "./reducer";
import { KanbasState } from "../../store";

function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const assignmentList = useSelector((state: KanbasState) => 
    state.assignmentsReducer.assignments);

  const assignment = useSelector((state: KanbasState) =>
    state.assignmentsReducer.assignment);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const confirmDeleteClick = () => {
    dispatch(deleteAssignment(assignment._id));
    setShowDeleteDialog(false);
  }

  const cancelDeleteClick = () => {
    setShowDeleteDialog(false);
  }

  const newAssignmentClick = async () => {
    const aid = new Date().getTime().toString();
  
    // TODO
    await dispatch(addAssignment({ ...assignment, _id: aid, course: cid }));

    const newAssignment = assignmentList.filter((a) => a._id === aid);

    console.log(newAssignment);

    await dispatch(setAssignment(newAssignment));

    navigate(`/Kanbas/Courses/${cid}/Assignments/${aid}`)

  }

  return (
    <div className="container">
      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <div>
            <FaEllipsisV className="me-2" />ASSIGNMENTS
            <span className="float-end">
              <FaCheckCircle className="text-success" />
                <Link
                    to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                    onClick={() => newAssignmentClick()}
                    >
                    <FaPlusCircle className="ms-2" />
                </Link>

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
          <button className="btn btn-success" onClick={confirmDeleteClick}>Yes</button>
          <button className="btn btn-danger" onClick={cancelDeleteClick}>No</button>
        </div>
      }
    </div>
);}

export default Assignments;