import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

const OneTruck = props => {
    const { id } = props;
    const [truck, setTruck] = useState({
        name: '',
        style: '',
        description: '',
        reviews: [],
        avg: 0
    });
    const [review, setReview] = useState({
        name: '',
        review: '',
        rating: 3
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8000/api/trucks/${id}`)
            .then(response => {
                if(response.data == null) {
                    navigate('/');
                }
                let avg = 0;
                if(response.data.reviews.length !== 0) {
                    response.data.reviews.forEach(r => {
                        avg += r.rating;
                    });
                    avg /= response.data.reviews.length;
                }
                response.data.avg = avg;
                setTruck(response.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    const submitHandler = e => {
        e.preventDefault();
        axios.patch(`http://localhost:8000/api/trucks/${id}/review`, review)
            .then(response => {
                if(response.data.errors) {
                    console.log(response.data.errors.reviews.errors);
                    setErrors(response.data.errors.reviews.errors);
                } else {
                    setReview({ name: '', review: '', rating: 3})
                    setTruck(response.data);
                    setErrors({});
                }
            })
            .catch(err => console.log(err));
    }

    const changeHandler = e => {
        setReview({
            ...review,
            [e.target.name]: e.target.value
        })
    }


    return (
        <div>
            <div className="row col-sm-12">
                <div className="offset-sm-2 col-sm-10">
                    <h2>{truck.name}</h2>
                    <p>Style: {truck.style}</p>
                    <p>Description: {truck.description}</p>
                    <p>Average Rating: {truck.avg} stars</p>
                </div>
                <div className="col-sm-12" style={{overflow:'auto', height: '500px'}}>
                    {
                        truck.reviews.map((item,i) => 
                            <div key={i} className="offset-sm-2 col-sm-8">
                                <p className="col-sm-3">{item.name}</p>
                                <div className="col-sm-9">
                                    <p>{item.review}</p>
                                    <p>Rating: {item.rating} stars</p>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="col-sm-12">
                    <form className="row" onSubmit={ submitHandler }>
                        <div className="col-sm-7">
                            <div className="form-group row">
                                {
                                    errors.name ?
                                    <span className="offset-sm-4 col-sm-8 text-danger">{errors.name.message}</span>
                                    :
                                    ''
                                }
                                <label htmlFor="name" className="col-sm-4">Name: </label>
                                <input type="text" name="name" onChange={ changeHandler } className="col-sm-8 form-control" value={ review.name }/>
                            </div>
                            <div className="form-group row">
                                {
                                    errors.review ?
                                    <span className="offset-sm-4 col-sm-8 text-danger">{errors.review.message}</span>
                                    :
                                    ''
                                }
                                <label htmlFor="review" className="col-sm-4">Review: </label>
                                <input type="text" name="review" onChange={ changeHandler } className="col-sm-8 form-control" value={ review.review }/>
                            </div>
                        </div>
                        <div className="col-sm-5">
                            <div className="form-group row">
                                {
                                    errors.rating ?
                                    <span className="offset-sm-4 col-sm-8 text-danger">{errors.rating.message}</span>
                                    :
                                    ''
                                }
                                <label htmlFor="rating" className="col-sm-4">Rating: </label>
                                <select name="rating" className="col-sm-6 offset-sm-1 form-control" onChange={ changeHandler } value={ review.rating }>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                            <div className="form-group row">
                                <button type="button" className="offset-sm-4 col-sm-4 btn btn-secondary" onClick={ () => setReview({name: '',review: '',rating: 3}) }>Cancel</button>
                                <button type="submit" className="col-sm-4 btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default OneTruck
