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
        console.log("Sign In Credentials: ", credentials)
        await client.signin(credentials);
        console.log("Returned Credentials: ", credentials)
        navigate("/Kanbas/Account/Profile");
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
        </div>
      </div>
    );
  }
  