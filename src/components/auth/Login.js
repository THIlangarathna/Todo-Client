import React, { useState } from 'react';
import toastr from 'toastr';
import { Navigate, useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    if (localStorage.getItem('token')) {
        return <Navigate replace to="/dashboard" />;
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userName, password })
            };
            fetch('https://localhost:7002/api/auth/login', requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.isSuccess) {
                        toastr.success('Logged In!');
                        // Assuming the auth API returns a bearer token in the "token" field
                        const token = data.result.token;
                        const name = data.result.user.name;
                        localStorage.setItem('token', token);
                        localStorage.setItem('username', name);
                        onLogin(token, name);
                        navigate("/dashboard");
                    } else {
                        toastr.error(data.message);
                    }
                })
                .catch((err) => {
                    toastr.error(err.message);
                });
        } catch (error) {
            // Handle network error
            toastr.error(error.message);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center">Login</h2>
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                        value={userName}
                                        required
                                        onChange={(e) => setUserName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        value={password}
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary float-end">
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
