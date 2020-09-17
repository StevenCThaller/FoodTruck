import React, { useState, useEffect } from 'react'
import axios from 'axios';
import TruckForm from './TruckForm';
import { navigate } from '@reach/router';

const EditTruck = props => {
    const { id } = props;
    const [truck,setTruck] = useState({
        name: '',
        style: '',
        description: ''
    });
    const [errors, setErrors] = useState({});

    useEffect( () => {
        axios.get(`http://localhost:8000/api/trucks/${id}`)
            .then(response => {
                if(response.data == null) {
                    navigate('/');
                }
                setTruck(response.data);
            })
            .catch(err => console.log(err));
    }, [id])

    const submitHandler = e => {
        e.preventDefault();
        axios.patch(`http://localhost:8000/api/trucks/${id}`, truck)
            .then(response => {
                if(response.data.errors){
                    setErrors(response.data.errors);
                }
                else {
                    navigate('/');
                }
            })
            .catch(err => console.log(err))
    }

    const changeHandler = e => {
        setTruck({
            ...truck,
            [e.target.name]: e.target.value 
        });
    }

    const deleteHandler = () => {
        axios.delete(`http://localhost:8000/api/trucks/${props.id}`)
            .then(response => navigate('/'))
            .catch(err => console.log(err));
    }
    return (
        <div>
            <h2>Edit Food Truck</h2>
            <form onSubmit={ submitHandler }>
                <TruckForm truck={truck} changeHandler={changeHandler} errors={errors} deleteHandler={deleteHandler} action="edit" />
            </form>
        </div>
    )
}

export default EditTruck
