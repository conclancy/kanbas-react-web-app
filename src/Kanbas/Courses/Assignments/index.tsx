import React from "react";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle, FaStickyNote  } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  setAssignment,
} from "./reducer";
import { KanbasState } from "../../store";

// const assignments = db.assignments;


function Assignments() {
  const { cid } = useParams();
  
  const assignmentList = useSelector((state: KanbasState) => 
    state.assignmentsReducer.assignments);

  const assignment = useSelector((state: KanbasState) =>
    state.assignmentsReducer.assignment);
  const dispatch = useDispatch();

  return (
    <>
      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <div>
            <FaEllipsisV className="me-2" /> ASSIGNMENTS
            <span className="float-end">
              <FaCheckCircle className="text-success" />
              <button className="" 
                onClick={() => dispatch(addAssignment({ ...assignment, course: cid }))}>
                
                <Link
                    to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}>
                    <FaPlusCircle className="ms-2" />
                </Link>
              </button>
              <FaEllipsisV className="ms-2" />
            </span>
          </div>
          <ul className="list-group">
            {assignmentList.map((assignment) => (
              <li className="list-group-item">
                <FaEllipsisV className="me-2" />
                <FaStickyNote className="me-2 text-success" />
                <Link
                  onClick={() => dispatch(setAssignment(assignment))}
                   to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}>{assignment.title}</Link>
                <span className="float-end">
                  <FaCheckCircle className="text-success" /><FaEllipsisV className="ms-2" /></span>
              </li>))}
          </ul>
        </li>
      </ul>
    </>
);}

export default Assignments;