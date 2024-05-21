import React from 'react'
import { useNavigate } from 'react-router-dom';

export function ButtonGroup() {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate('/Edit');
    }

    return (
        <div className="btn-group" role="group" aria-label="Basic mixed styles example">
            <button type="button" className="btn btn-warning mx-2" onClick={handleEdit}>Edit</button>
            <button type="button" className="btn btn-danger">delete</button>
        </div>
    )
}


