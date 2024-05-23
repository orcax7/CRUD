import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, ButtonGroup, InputGroup, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import "../App.css";

function UserTable() {
    const [userData, setUserData] = useState([]);
    const [filteredUserData, setFilteredUserData] = useState([]);
    const navigate = useNavigate();
    const params = useParams();
    const [search , setSearch] = useState('')

    const handleAdd = () => {
        navigate('/Add');
    }

    const fetchAPI = async () => {
        try {
            const response = await axios.get("http://localhost:61089/user/get_all");
            setUserData(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    const fetchUserById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:61089/user/get_id/${id}`);
            setUserData([response.data]);
        } catch (error) {
            console.error("Error fetching user by ID:", error);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:61089/user/delete/${id}`);
                fetchAPI();
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };

    useEffect(() => {
        if (params.id) {
            fetchUserById(params.id);
        } else {
            fetchAPI();
        }
    }, [params.id]);

    useEffect(() => {
        const filteredData = userData.filter(user => {
            if (!search) return true;
            return Object.values(user).some(value =>
                (typeof value === 'string' || typeof value === 'number') && 
                value.toString().toLowerCase().includes(search.toLowerCase())
            );
        });
        setFilteredUserData(filteredData);
    }, [userData, search]);
    

    return (
        <div className='container'>
            <InputGroup className='my-3'>
                <Form.Control
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='ค้นหา User'
                />
            </InputGroup>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Username</th>
                        <th scope="col">Address</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUserData.map(data => (
                        <tr key={data.id}>
                            <th>{data.id}</th>
                            <td>{data.name}</td>
                            <td>{data.username}</td>
                            <td>{data.address}</td>
                            <td>{data.phoneNumber}</td>
                            <td>
                                <ButtonGroup>
                                    <Button className="button-spacing" onClick={() => navigate(`/Edit/${data.id}`)}>Edit</Button>
                                    <Button variant='danger' onClick={() => handleDelete(data.id)}>Delete</Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Button type="submit" variant='success' onClick={handleAdd}>Add</Button>
        </div>
    );
}

export default UserTable;
