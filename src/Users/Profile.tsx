import * as client from "./client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Profile() {

    const navigate = useNavigate();
    
    // create a profile state variables 
    const [profile, setProfile] = useState({ 
        username: "", 
        password: "", 
        firstName: "", 
        lastName: "", 
        dob: "", 
        email: "", 
        role: "USER" 
    });

    // get profile information 
    const fetchProfile = async () => {
        const account = await client.profile();
        console.log("Account: ", account)
        setProfile(account);
        console.log("Profile:", profile)
    };

    // save an updated user profile by sending profile data to server
    const save = async () => {
        await client.updateUser(profile);
    };    

    useEffect(() => {fetchProfile();}, []);

    return (
        <div className="container">
            <h1>Profile</h1>
            <button className="btn btn-primary" onClick={save}>
                Save
            </button>
            <Link to="/Kanbas/Account/Admin/Users"
                className="btn btn-warning w-100">
                Users
            </Link>
            {profile && (
                <div className="form-group">
                    <input className="form-control" value={profile.username} onChange={(e) =>
                        setProfile({ ...profile, username: e.target.value })}/>
                    <input className="form-control" value={profile.password} onChange={(e) =>
                        setProfile({ ...profile, password: e.target.value })}/>
                    <input className="form-control" value={profile.firstName} onChange={(e) =>
                        setProfile({ ...profile, firstName: e.target.value })}/>
                    <input className="form-control" value={profile.lastName} onChange={(e) =>
                        setProfile({ ...profile, lastName: e.target.value })}/>
                    <input className="form-control" value={profile.dob} type="date" onChange={(e) =>
                        setProfile({ ...profile, dob: e.target.value })}/>
                    <input className="form-control" value={profile.email} onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })}/>
                    <select className="form-control" onChange={(e) =>
                        setProfile({ ...profile, role: e.target.value })}>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="STUDENT">Student</option>
                    </select>
                </div>
            )}
        </div>
    );
}
