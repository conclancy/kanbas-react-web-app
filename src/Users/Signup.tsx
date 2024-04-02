import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";

export default function Signup() {

    // create state variables 
    const [error, setError] = useState("");
    const [user, setUser] = useState({ username: "", password: "" });

    const navigate = useNavigate();

    const signup = async () => {
        try {
            await client.signup(user);
            navigate("/Kanbas/Account/Profile");
        } catch (err: any) {
            setError(err.response.data.message);
        }
    };

    return (
        <div className="container">
            <h1>Signup</h1>
            {error && <div className="alert alert-warning">{error}</div>}
            <input className="form-control" placeholder="Username" type="text" value={user.username} onChange={(e) => setUser({
                ...user, username: e.target.value })} />
            <input className="form-control" placeholder="Password" type="text" value={user.password} onChange={(e) => setUser({
                ...user, password: e.target.value })} />
            <button className="btn btn-primary" onClick={signup}> Signup </button>
        </div>
    );
}
