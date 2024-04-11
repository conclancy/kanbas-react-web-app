import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Routes, Route, Navigate, useLocation  } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import courses from "../Database/courses.json";
import ModuleList from "./Modules/List";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import './index.css';
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Grades from "./Grades";


function Courses() {
  const { cid } = useParams();
  const BASE_API = process.env.REACT_APP_BASE_API_URL;
  const COURSES_API = `${BASE_API}/api/courses`;

  const [course, setCourse] = useState<any>({ _id: "" });
  
  const findCourseById = async (cid?: string) => {
    const response = await axios.get(
      `${COURSES_API}/${cid}`
    );
    setCourse(response.data);
  };

  useEffect(() => {
    findCourseById(cid);
  }, [cid]);

  const { pathname } = useLocation();
  const [, , , , myPageName] = pathname.split("/");
  
  return (
    <>
      <div className="m-2">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li><HiMiniBars3 /></li>
            <li className="breadcrumb-item"><a href="#">{course?.number}</a></li>
            <li className="breadcrumb-item"><a href="#">{myPageName}</a></li>
          </ol>
        </nav>
      </div>
      <CourseNavigation />
      <div>
        <div
          className="overflow-y-scroll position-fixed bottom-0 end-0"
          style={{ left: "320px", top: "50px" }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home/>} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<h1>Piazza</h1>} />
            <Route path="Assignments" element={<Assignments/>} />
            {/* <Route
              path="Assignments/:assignmentId"
              element={<AssignmentEditor assignmentId={course}/>}
            /> */}
            <Route path="Grades" element={<Grades />} />
          </Routes>
        </div>
      </div>

      <pre>
        <code>{JSON.stringify(course, null, 2)}</code>
      </pre>
    </>
  );
}

export default Courses;
