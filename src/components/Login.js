import React, { useState } from 'react';
import '../styles/Login.css';
import { useDispatch } from "react-redux";
import { login } from "../slices/gameSlice";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const dispatch = useDispatch();

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
                const token = data.token;
                localStorage.setItem('token', token); // Save token to local storage
                localStorage.setItem('user', JSON.stringify(data.user)); // Save user object to local storage
                console.log('Logged in successfully:', data.user);
                // Save the token and redirect the user to the dashboard or character selection screen
                dispatch(login());
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
                // Show a message and change the form back to the login mode
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
            <form>
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
                    type="button"
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
