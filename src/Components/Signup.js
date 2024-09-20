import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth, db } from '../Config/Config';

export const Signup = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registrationError, setRegistrationError] = useState('');
    const history = useHistory();

    const handleRegister = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then((cred) => {
                db.collection('users').doc(cred.user.uid).set({
                    Name: fullName,
                    Email: email,
                    Password: password
                }).then(() => {
                    setFullName('');
                    setEmail('');
                    setPassword('');
                    setRegistrationError('');
                    history.push('/login'); // Redirect to login after registration
                }).catch(err => setRegistrationError(err.message));
            }).catch(err => setRegistrationError(err.message));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">REGISTER HERE</h2>
            <form autoComplete="off" className="bg-white p-6 rounded shadow-md w-96"
                  onSubmit={handleRegister}>
                <div className="mb-4">
                    <label className="block text-gray-700">Enter Full Name</label>
                    <input 
                        type="text" 
                        className="border border-gray-300 p-2 rounded w-full" 
                        required 
                        onChange={(e) => setFullName(e.target.value)} 
                        value={fullName} 
                    />
                </div>
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
                <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">
                    REGISTER
                </button>
            </form>
            {registrationError && <div className="text-red-500 mt-4">{registrationError}</div>}
            <span className="mt-4">
                Already have an account? Login <Link to="login" className="text-blue-500">here</Link>
            </span>
        </div>
    );
};
