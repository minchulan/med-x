import React, { useState, useEffect, useContext } from 'react';
import { ErrorsContext } from './context/ErrorsContext';
import { UserContext } from './context/UserContext';
import { useNavigate } from 'react-router-dom';

const Login = ({ loading }) => {
    const { setErrors } = useContext(ErrorsContext);
    const { loginUser, loggedIn } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && loggedIn) {
            navigate('/')
        }
        return () => {
            setErrors([])
        }
    }, [loading, loggedIn, navigate, setErrors])

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email, password})
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.errors) {
                    setErrors(data.errors);
                } else {
                    loginUser(data)
                    setErrors([])
                    navigate("/posts")
                }
            })
    }


    return (
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
          />
        </div>
        
        <input type="submit" value="Login" />
      </form>
    );
}

export default Login