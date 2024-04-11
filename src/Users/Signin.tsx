import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "./client";
import * as client from "./client";

export default function Signin() {

    // use navigate functionality 
    const navigate = useNavigate();

    // create a credentials state variable
    const [credentials, setCredentials] = useState<User>({
        _id: "",
        username: "", 
        password: "", 
        firstName: "", 
        lastName: "", 
        role: "USER"
    });

    // create a function call to sign in 
    const signin = async () => {
        const newCreds = await client.signin(credentials);
        setCredentials({
            ...credentials, 
            _id: newCreds._id, 
            username: newCreds.username, 
            password: newCreds.password, 
            firstName: newCreds.firstName, 
            lastName: newCreds.lastName, 
            role: newCreds.role,
        })
        navigate("/Kanbas/Account/Profile");
    };

    const signup = async () => {
        navigate("/Kanbas/Account/Signup");
    };

    return (
      <div className="container">
        <h1>Signin</h1>
        <div className="form-group">
            <input
                id="inputUsername"
                className="form-control" 
                placeholder="Username"
                value={credentials.username} 
                onChange={
                    (e) => setCredentials({ ...credentials, username: e.target.value })
                }
            />
            <input
                id="inputPassword"
                className="form-control"
                placeholder="Password"  
                type="password"
                value={credentials.password} 
                onChange={
                    (e) => setCredentials({ ...credentials, password: e.target.value })
                }
            />
            <button className="btn btn-primary" onClick={signin}> Signin </button>
            <button className="btn btn-primary" onClick={signup}> Signup </button>
        </div>
      </div>
    );
  }
  