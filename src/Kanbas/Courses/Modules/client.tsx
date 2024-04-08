import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

const COURSES_API =  `${API_BASE}/api/courses`;
const MODULES_API = `${API_BASE}/api/modules`;

// GET all modules by courseId 
export const findModulesForCourse = async (courseId: any) => {
    const response = await axios
        .get(`${COURSES_API}/${courseId}/modules`);
    return response.data;  
};

// POST create a new module for a course 
export const createModule = async (courseId: any, module: any) => {
    const response = await axios.post(
      `${COURSES_API}/${courseId}/modules`,
      module
    );
    return response.data;
};

// DELETE a module by moduleId
export const deleteModule = async (moduleId: any) => {
    const response = await axios
      .delete(`${MODULES_API}/${moduleId}`);
    return response.data;
};

// PUT an update module to the server
export const updateModule = async (module: any) => {
    const response = await axios.
      put(`${MODULES_API}/${module._id}`, module);
    return response.data;
  };
  
  
