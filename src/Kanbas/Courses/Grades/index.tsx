import { useParams } from "react-router-dom";
import db from "../../Database";

const assignments = db.assignments;
const enrollments = db.enrollments;
const grades = db.grades;
const users = db.users;

function Grades() {
  const { cid } = useParams();
  const as = assignments.filter((assignment) => assignment.course === cid);
  const es = enrollments.filter((enrollment) => enrollment.course === cid);
  
  return (
    <div>
      <h1>Grades</h1>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <th>Student Name</th>
            {as.map((assignment) => (<th>{assignment.title}</th>))}
          </thead>
          <tbody>
            {es.map((enrollment) => {
              const user = users.find((user) => user._id === enrollment.user);
              return (
                <tr>
                   <td>{user?.firstName} {user?.lastName}</td>
                   {assignments.map((assignment) => {
                     const grade = grades.find(
                       (grade) => grade.student === enrollment.user && grade.assignment === assignment._id);
                       return (<td>{grade?.grade || ""}</td>);})}
                </tr>);
            })}
          </tbody></table>
      </div></div>);
}

export default Grades;

