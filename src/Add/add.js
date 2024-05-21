import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Add() {
    const [userData, setUserData] = useState({
        name: '',
        userName: '',
        email: '',
        phoneNumber: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value   
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(userData);
        try {
            const response = await axios.post("http://localhost:3001/user", userData);
            console.log("User added:", response.data);
            setUserData({
                name: '',
                userName: '',
                email: '',
                phoneNumber: ''
            });
            navigate('/');
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };
    
    return (
        <div className="container">
            <h2>Add user</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={userData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="userName">Username:</label>
                    <input type="text" id="userName" name="userName" value={userData.userName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input type="text" id="phoneNumber" name="phoneNumber" value={userData.phoneNumber} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Save</button>
                </div>
            </form>
        </div>
    );
}

export default Add;
