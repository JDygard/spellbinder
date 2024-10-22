import React, { useState, useEffect } from 'react';
import '../styles/Login.css';
import { useDispatch } from "react-redux";
import { setInitialState } from "../store/slices/authSlice"; // Changed from gameSlice
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Check for existing token on component mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const refreshToken = localStorage.getItem('refreshToken');
            
            dispatch(setInitialState({
                loggedIn: true,
                user,
                token,
                refreshToken
            }));
            navigate('/');
        }
    }, [dispatch, navigate]);

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.accessToken;
                const refreshToken = data.refreshToken;
                
                // Save to localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                // Update Redux state
                dispatch(setInitialState({
                    loggedIn: true,
                    user: data.user,
                    token,
                    refreshToken
                }));

                // Navigate after state is updated
                navigate('/');
            } else {
                console.error('Login failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const newUser = await response.json();
                console.log('Registered successfully:', newUser);
                setIsRegistering(false);
            } else {
                console.error('Registration failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    const toggleRegisterMode = () => {
        setIsRegistering(!isRegistering);
    };

    return (
        <div className="login-container">
            <h1>{isRegistering ? 'Register' : 'Login'}</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                    onClick={isRegistering ? handleRegister : handleLogin}
                >
                    {isRegistering ? 'Register' : 'Login'}
                </button>
                <button type="button" onClick={toggleRegisterMode}>
                    {isRegistering
                        ? 'Already have an account? Login'
                        : "Don't have an account? Register"}
                </button>
            </form>
        </div>
    );
};

export default Login;