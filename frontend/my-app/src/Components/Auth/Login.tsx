import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../Services/authService';
import { useAuth } from '../../Hooks/useAuth';

const Login: React.FC = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { isAuthenticated, checkAuthStatus } = useAuth();

    useEffect(() => {
        if (isAuthenticated) navigate('/dashboard');
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await loginUser(name, password);
            await checkAuthStatus();
        } catch (error) {
            alert('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="col-lg-5 col-md-7 col-sm-10">
                <div className="card shadow-lg">
                    <div className="card-body p-4">
                        <h2 className="card-title text-center mb-4">Welcome Back</h2>
                        <p className="text-center text-muted mb-4">
                            Please enter your credentials to access your account.
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Enter your username"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
                        </form>
                        <div className="text-center">
                            <p className="mb-0">
                                Don’t have an account? <Link to="/register" className="text-primary">Register here</Link>
                            </p>
                            <p className="text-muted small mt-2">
                                Forgot your password? <Link to="/forgot-password" className="text-primary">Reset it here</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
