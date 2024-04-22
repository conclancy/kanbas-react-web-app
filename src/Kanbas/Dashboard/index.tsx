import React, { useState } from "react";
import { Link } from "react-router-dom";
import db from "../Database";

function Dashboard({ courses, course, setCourse, addNewCourse,
  deleteCourse, updateCourse }: {
  courses: any[]; course: any; setCourse: (course: any) => void;
  addNewCourse: () => void; deleteCourse: (course: any) => void;
  updateCourse: () => void; }) 
  {

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
      <h2>Published Courses</h2>
      <hr />
      <div className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => (
            <div className="col" key={course._id} style={{ width: "300px" }}>
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
    </div>
  );
}

export default Dashboard;
