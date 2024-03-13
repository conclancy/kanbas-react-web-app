import React, { useState } from "react";
import { Link } from "react-router-dom";
import db from "../Database";

function Dashboard() {

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
    <div className="p-4">
      <h1>Dashboard</h1>

      <h5>Course</h5>
      <input value={course.name} className="form-control"
             onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
      <input value={course.number} className="form-control"
             onChange={(e) => setCourse({ ...course, number: e.target.value }) } />
      <input value={course.startDate} className="form-control" type="date"
             onChange={(e) => setCourse({ ...course, startDate: e.target.value }) }/>
      <input value={course.endDate} className="form-control" type="date"
             onChange={(e) => setCourse({ ...course, endDate: e.target.value }) } />

      <button className = "btn btn-primary" onClick={addNewCourse} >
        Add
      </button>
      <button className = "btn btn-secondary" onClick={updateCourse} >
        Update
      </button>


      <hr />
      <h2>Published Courses (12)</h2>
      <hr />
      <div className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => (
            <div className="col" style={{ width: "300px" }}>
              <div className="card">
                <img
                  src="/images/php.png"
                  className="card-img-top"
                  style={{ maxHeight: "150px" }}
                />
                <div className="card-body">
                  <Link
                    className="card-title"
                    to={`/Kanbas/Courses/${course._id}`}
                    style={{
                      textDecoration: "none",
                      color: "navy",
                      fontWeight: "bold",
                    }}
                  >
                    {course.name}
                  </Link>
                  <p className="card-text">Full Stack software developer</p>
                  <Link to={`/Kanbas/Courses/${course._id}`} className="btn btn-primary">
                    Go
                  </Link>
                  <button className="btn btn-danger" onClick={(event) => {
                      event.preventDefault();
                      deleteCourse(course._id);
                    }}>
                    Delete
                  </button>
                  <button className="btn btn-secondary" onClick={(event) => {
                    event.preventDefault();
                    setCourse(course);
                  }}>
              Edit
            </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <pre>
        <code>{JSON.stringify(courses, null, 2)}</code>
      </pre>
    </div>
  );
}

export default Dashboard;
