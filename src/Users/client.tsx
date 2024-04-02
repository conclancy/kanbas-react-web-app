import axios from "axios";

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const USERS_API = `${BASE_API}/api/users`;

// create an interface for User
export interface User { 
    _id: string; 
    username: string; 
    password: string; 
    role: string;
    firstName: string, 
    lastName: string 
};

// signin function, takes in a user attempts to authenticate 
export const signin = async (credentials: User) => {
  const response = await axios.post( `${USERS_API}/signin`, credentials );
  return response.data;
};

// POST profile information
export const profile = async () => {
    const response = await axios.post(`${USERS_API}/profile`);
    return response.data;
};

// PUT updates to a user object
export const updateUser = async (user: any) => {
    const response = await axios.put(`${USERS_API}/${user._id}`, user);
    return response.data;
};

// GET all users
export const findAllUsers = async () => {
    const response = await axios.get(`${USERS_API}`);
    return response.data;
};

// POST a new user
export const createUser = async (user: any) => {
    const response = await axios.post(`${USERS_API}`, user);
    return response.data;
};

// DELETE an existing user 
export const deleteUser = async (user: any) => {
    const response = await axios.delete(`${USERS_API}/${user._id}`);
    return response.data;
};

// GET a user by user id 
export const findUserById = async (id: string) => {
    const response = await axios.get(`${USERS_API}/${id}`);
    return response.data;
};

// GET users by role 
export const findUsersByRole = async (role: string) => {
    const response = await
      axios.get(`${USERS_API}?role=${role}`);
    return response.data;
};
