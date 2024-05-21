import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

function Add() {
    const [userData, setUserData] = useState({
        name: '', 
        username: '', 
        address: '', 
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
            const response = await axios.post("http://localhost:55174/user/add", userData);
            console.log("User added:", response.data);
            setUserData({
            name: '', 
            username: '', 
            address: '', 
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
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text"
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text"
                        id="username"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control 
                        type="text"
                        id="address"
                        name="address"
                        value={userData.address}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>phoneNumber</Form.Label>
                    <Form.Control 
                        type="number"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={userData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                
                <Button variant='warning' type='submit'>Save</Button>
            </Form>
        </div>
    );
}

export default Add;
