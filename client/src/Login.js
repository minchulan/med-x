import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/user";
import { ErrorsContext } from "./context/error";
import "./Login.css"; 

const Login = ({ loading }) => {
    const { login, loggedIn } = useContext(UserContext);
    const { errors, setErrors } = useContext(ErrorsContext);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const { username, email, password } = formData;

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
        const user = {
            username,
            email,
            password,
        };
            
        login(user);
    };

    const ephemeralErrors = () => {
    if (errors && errors.length > 0) {
        setTimeout(() => {
        setErrors([]);
        }, 5000);
    }
    };

    ephemeralErrors();


    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="login-form">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                onChange={handleChange}
                value={email}
                name="email"
                id="email"
                // required
            />
            </div>
            <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                onChange={handleChange}
                value={password}
                name="password"
                id="password"
                // required
            />
            </div>
            <button type="submit">Log In</button>
        </form>
        </div>
    );
};

export default Login;
