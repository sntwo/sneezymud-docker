import React, { useState } from 'react';
import './login.css';

const LogoutForm = ({authUser, setAuthUser}) => {

    async function logout(e) {
        e.preventDefault();
        fetch('http://localhost:3001/logout');
        setAuthUser([]);
    }


    return (
    <div className="logout">
        <p>Greetings, {authUser.name}</p>
        <p>Block A: {authUser.blocks.blockastart} - {authUser.blocks.blockaend}</p>
        <p>Block B: {authUser.blocks.blockbstart} - {authUser.blocks.blockbend}</p>
        <button type="submit" className="login-button" onClick={(e) => logout(e)}>Logout</button>
    </div>
    );
};

const LoginForm = ({setAuthUser}) => {

    const [name, setName] = useState("");
    const [pwd, setPwd] = useState("");
    const [loginErr, setLoginErr] = useState("");
    
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
        const json = await response.json();
        if (response.status == 401){
            setLoginErr("Bad username / passowrd");
        }
        if (response.status == 403){
            setLoginErr("Try again in a few seconds");
        }
        if (json.authUser){
            console.log(json.authUser.name);
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
            <div>{loginErr}</div>
        </form>
    </div>
  );
};

const LogForm = ({ authUser, setAuthUser }) => {
    return (
        <div>
        { authUser.loggedIn ? 
            ( <LogoutForm authUser={authUser} setAuthUser={setAuthUser}/> )
            : (<LoginForm setAuthUser={setAuthUser}/>)
        }
        </div>
    );
}

export default LogForm;