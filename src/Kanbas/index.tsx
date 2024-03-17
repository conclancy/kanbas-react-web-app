import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Courses from "./Courses";
import AssignmentEditor from "./Courses/Assignments/Editor";
import db from "./Database";
import { useState } from "react";
import store from "./store";
import { KanbasState } from "./store";
import { Provider, useSelector } from "react-redux";

function Kanbas() {


  // create courses state; initialize with database courses 
  const [courses, setCourses] = useState(db.courses);

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
  const addNewCourse = () => {

    const newCourse = {
      ...course,
      _id: new Date().getTime().toString()
    };

    setCourses([...courses, { ...course, ...newCourse }]);
  };

  // function to delete a course by Id
  const deleteCourse = (courseId: string) => {
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  // function to edit an existing course
  const updateCourse = () => {
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
            <Route path="/Dashboard" element={
              <Dashboard
              courses={courses}
              course={course}
              setCourse={setCourse}
              addNewCourse={addNewCourse}
              deleteCourse={deleteCourse}
              updateCourse={updateCourse}/>

            } />
            <Route path="/Account" element={<h1>Account</h1>} />
            <Route path="/Courses" element={<Courses courses={courses} />} />
            <Route path="/Courses/:cid/*" element={<Courses courses={courses} />} />
            <Route path="/Courses/:cid/Assignments/:assignmentId" element={<AssignmentEditor />} />
          </Routes>
        </div>
      </div>
    </Provider>
  );
}
export default Kanbas;
