import React, { useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import toastr from 'toastr';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    if (localStorage.getItem('token')) {
        return <Navigate replace to="/dashboard" />;
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phoneNumber, password })
            };
            fetch('https://localhost:7002/api/auth/register', requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.isSuccess) {
                        toastr.success('User has been Registered! Please Log in');
                        navigate("/login");
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
        <form onSubmit={handleRegister}>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title text-center">Register</h2>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Name"
                                        value={name}
                                        required
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                        value={email}
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Phone Number"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
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
                                <button className="btn btn-primary float-end" type="submit">
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Register;
