import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function UserTable() {
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();
    const params = useParams();

    const handleAdd = () => {
        navigate('/Add');
    }

    const fetchAPI = async () => {
        try {
            const response = await axios.get("http://localhost:55174/user/get_all");
            setUserData(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    const fetchUserById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:55174/user/get_id/${id}`);
            setUserData([response.data]);
        } catch (error) {
            console.error("Error fetching user by ID:", error);
        }
    };

    useEffect(() => {
        if (params.id) {
            fetchUserById(params.id);
        } else {
            fetchAPI();
        }
    }, [params.id]);

    return (
        <div className='container'>
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
                    {userData.map(data => (
                        <tr key={data.id}>
                            <th>{data.id}</th>
                            <td>{data.name}</td>
                            <td>{data.username}</td>
                            <td>{data.address}</td>
                            <td>{data.phoneNumber}</td>
                            <td>
                                <Button onClick={() => navigate(`/Edit/${data.id}`)}>Edit</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Button type="button" className="btn btn-success" onClick={handleAdd}>Add</Button>
        </div>
    );
}

export default UserTable;
