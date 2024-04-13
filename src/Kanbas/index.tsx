import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Courses from "./Courses";
import AssignmentEditor from "./Courses/Assignments/Editor";
import db from "./Database";
import { useState, useEffect } from "react";
import store from "./store";
import { KanbasState } from "./store";
import { Provider, useSelector } from "react-redux";
import axios from "axios";
import Account from "./Account";
import QuizEditor from "./Courses/Quizzes/Editor";

function Kanbas() {

  // API env variable
  const API_BASE = process.env.REACT_APP_API_BASE;

  // create courses state; initialize with database courses 
  const [courses, setCourses] = useState<any[]>([]);

  // create courses API constant
  const COURSES_API =  `${API_BASE}/api/courses`;

  // call API to get courses from server
  const findAllCourses = async () => {
    const response = await axios.get(COURSES_API);
    setCourses(response.data);
  };

  useEffect(() => {
    findAllCourses();
  }, []);


  // create courses object; template for new courses
  const [course, setCourse] = useState({
    _id: "0",
    name: "default New Course",
    number: "default New Number",
    startDate: "2023-09-10", 
    endDate: "2023-12-15",
    image: "/images/php.png"
  });

  // function to add a new course to existing courses state
  const addNewCourse = async () => {

    const response = await axios.post(COURSES_API, course);
    setCourses([ ...courses, response.data ]);

  };

  // function to delete a course by Id
  const deleteCourse = async (courseId: string) => {
    const response = await axios.delete(
      `${COURSES_API}/${courseId}`
    );

    setCourses(courses.filter((course) => course._id !== courseId));
  };

  // function to edit an existing course
  const updateCourse = async () => {
    const response = await axios.put(
      `${COURSES_API}/${course._id}`,
      course
    );

    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };


  return (
    <Provider store={store}>
      <div className="d-flex">
        <div>
          <KanbasNavigation />
        </div>
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route path="/Dashboard" element={
              <Dashboard
              courses={courses}
              course={course}
              setCourse={setCourse}
              addNewCourse={addNewCourse}
              deleteCourse={deleteCourse}
              updateCourse={updateCourse}/>

            } />
            <Route path="/Account" element={<Account />} />
            <Route path="/Courses/:cid/*" element={<Courses />} />
            <Route path="/Courses/:cid/Assignments/:assignmentId" element={<AssignmentEditor />} />
            <Route path="/Courses/:cid/Quizzes/:qid" element={<QuizEditor />} />
          </Routes>
        </div>
      </div>
    </Provider>
  );
}
export default Kanbas;
