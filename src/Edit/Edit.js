import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

function Edit() {
    const [user, setUser] = useState({ name: '', username: '', address: '', phoneNumber: '' });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:55174/user/get_id/${id}`);
                setUser(response.data[0]); 
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:55174/user/edit/${id}`, user);
            navigate('/');
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div className='container'>
            <h2>Edit User</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="name" 
                        value={user.name} 
                        onChange={handleChange} 
                        required 
                    />
                </Form.Group>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="username" 
                        value={user.username} 
                        onChange={handleChange} 
                        required 
                    />
                </Form.Group>
                <Form.Group controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="address" 
                        value={user.address} 
                        onChange={handleChange} 
                        required 
                    />
                </Form.Group>
                <Form.Group controlId="formPhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control 
                        type="number" 
                        name="phoneNumber" 
                        value={user.phoneNumber}
                        onChange={handleChange} 
                        required 
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Save</Button>
            </Form>
        </div>
    );
}

export default Edit;
