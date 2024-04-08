import React, { useState, useEffect } from "react";
import * as client from "./client";
import { User } from "./client";
import { BsTrash3Fill, BsPlusCircleFill, 
    BsFillCheckCircleFill, BsPencil } from "react-icons/bs";

export default function UserTable() {
    
    // create a list of users in state
    const [users, setUsers] = useState<User[]>([]);

    // create a single user variable in state
    const [user, setUser] = useState<User>({
        _id: "", username: "", password: "", firstName: "",
        lastName: "", role: "USER" 
    });

    // create a role variable in state 
    const [role, setRole] = useState("USER");

    // POST new user to server 
    const createUser = async () => {
        try {
            const newUser = await client.createUser(user);
            setUsers([newUser, ...users]);
        } catch (err) {
            console.log(err);
        }
    };

    // GET users from the server
    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };

    // DELETE an existing user 
    const deleteUser = async (user: User) => {
        try {
            await client.deleteUser(user);
            setUsers(users.filter((u) => u._id !== user._id));
        } catch (err) {
            console.log(err);
        }
    };
    
    // GET a user by ID 
    const selectUser = async (user: User) => {
        try {
            const u = await client.findUserById(user._id);
            setUser(u);
        } catch (err) {
            console.log(err);
        }
    };

    // PUT updates to a server 
    const updateUser = async () => {
        try {
            const status = await client.updateUser(user);
            setUsers(users.map((u) =>
            (u._id === user._id ? user : u)));
        } catch (err) {
            console.log(err);
        }
    };

    // GET all users with a role type 
    const fetchUsersByRole = async (role: string) => {
        const users = await client.findUsersByRole(role);
        setRole(role);
        setUsers(users);
    };
    

    useEffect(() => { fetchUsers(); }, []);

    return (
        <div>
        <h1>User Table</h1>
        <select
            onChange={(e) => fetchUsersByRole(e.target.value)}
            value={role || "USER"}
            className="form-control w-25 float-end"
        >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
        </select>
        <table className="table">
            <thead>
                <tr>
                    <th>Username</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Role</th>
                </tr>
                <tr>
                    <td className="text-nowrap">
                        <input className="form-control" placeholder="Username" type="text" value={user.username} onChange={(e) =>
                            setUser({ ...user, username: e.target.value })}/>
                        <input className="form-control" placeholder="Password" type="password" value={user.password} onChange={(e) =>
                            setUser({ ...user, password: e.target.value })}/>
                    </td>
                    <td>
                        <input className="form-control" placeholder="First Name" type="text" value={user.firstName}  onChange={(e) =>
                            setUser({ ...user, firstName: e.target.value })}/>
                    </td>
                    <td>
                        <input className="form-control" placeholder="Last Name" type="text" value={user.lastName} onChange={(e) =>
                            setUser({ ...user, lastName: e.target.value })}/>
                        </td>
                    <td>
                    <select className="form-control" value={user.role} onChange={(e) =>
                        setUser({ ...user, role: e.target.value })}>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="STUDENT">Student</option>
                    </select>
                    </td>
                    <td className="text-nowrap">
                        <BsPlusCircleFill className="me-2 text-success fs-1 text" onClick={createUser}/>
                        <BsFillCheckCircleFill className="me-2 text-success fs-1 text" onClick={updateUser}/>
                    </td>
                </tr>
            </thead>
            <tbody>
                {users.map((user: any) => (
                    <tr key={user._id}>
                        <td>{user.username}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.role}</td>
                        <td className="text-nowrap">
                            <button className="btn btn-danger me-2" onClick={() => deleteUser(user)}>
                                <BsTrash3Fill />
                            </button>
                            <button className="btn btn-warning me-2">
                                <BsPencil onClick={() => selectUser(user)} />
                            </button>
                        </td>
                    </tr>))}
            </tbody>
        </table>
        </div>
    );
}
