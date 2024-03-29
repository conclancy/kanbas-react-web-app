import axios from "axios";
const COURSES_API = "http://localhost:4000/api/courses";
const ASSIGNMENTS_API = "http://localhost:4000/api/assignments";

// GET all assignments by courseId 
export const findAssignmentsForCourse = async (courseId: any) => {
  const response = await axios
    .get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};

// GET all assignments by courseId 
export const findAssignment = async (assignmentId: any) => {
    const response = await axios
      .get(`${ASSIGNMENTS_API}/${assignmentId}`);
    return response.data;
  };

// POST a new assignment by courseId
export const createAssignment = async (courseId:any, module:any) => {
    const response = await axios.post(
      `${COURSES_API}/${courseId}/assignments`,
      module
    );
    return response.data;
};
  
// DELETE a new assignment by assignmentId
export const deleteAssignment = async (assignmentId: any) => {
  const response = await axios
    .delete(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};

// PUT an updated assignment by assignmentId
export const updateAssignment = async (assignment: any) => {
    console.log(assignment);
    const response = await axios.
      put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
    return response.data;
  };
  
