import React, { useState } from 'react';
import './login.css';



const LogoutForm = () => {
    return (
    <div>logout</div>
    );
};

const LoginForm = ({setAuthUser}) => {

    const [name, setName] = useState("");
    const [pwd, setPwd] = useState("");
    
    async function login(e) {
        e.preventDefault();
        //... try server login
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                username: name,
                password: pwd,
            })
        });
        console.log(response);
        const json = await response.json();
        if (json.authUser){
            setAuthUser(json.authUser);
        }
    }

  return (
    <div className="login">
        <form>
            <label className="label">Account Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required/>
            <label className="label">Password</label>
            <input type="password" value={pwd} onChange={e => setPwd(e.target.value)} required/>
            <button type="submit" className="login-button" onClick={(e) => login(e)}>Login</button>
        </form>
    </div>
  );
};

const LogForm = ({ authUser, setAuthUser }) => {
    return (
        <div>
        { authUser.loggedIn ? 
            ( <LogoutForm /> )
            : (<LoginForm setAuthUser={setAuthUser}/>)
        }
        </div>
    );
}

export default LogForm;