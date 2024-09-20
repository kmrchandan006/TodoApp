import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../Config/Config';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const history = useHistory();

    const handleLogin = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                setEmail('');
                setPassword('');
                setLoginError('');
                history.push('/'); // Redirect to home after login
            })
            .catch(err => setLoginError(err.message));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">LOGIN HERE</h2>
            <form autoComplete="off" className="bg-white p-6 rounded shadow-md w-96"
                  onSubmit={handleLogin}>
                <div className="mb-4">
                    <label className="block text-gray-700">Enter Email</label>
                    <input 
                        type="email" 
                        className="border border-gray-300 p-2 rounded w-full" 
                        required 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email} 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Enter Password</label>
                    <input 
                        type="password" 
                        className="border border-gray-300 p-2 rounded w-full" 
                        required 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password} 
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                    LOGIN
                </button>
            </form>
            {loginError && <div className="text-red-500 mt-4">{loginError}</div>}
            <span className="mt-4">
                Don't have an account? Create One <Link to="signup" className="text-blue-500">here</Link>
            </span>
        </div>
    );
};
