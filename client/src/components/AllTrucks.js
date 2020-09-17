import React, { useState, useEffect } from 'react'
import { navigate } from '@reach/router';
import axios from 'axios';
const avg = require('./helpers/average')

const AllTrucks = () => {
    const [allTrucks, setAllTrucks] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/trucks')
            .then(response => {
                setAllTrucks(response.data);
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <div className="col-sm-12" style={{ overflow: 'auto' }}>
            {
                allTrucks.map((item, i) => {
                    // let avg = 0;
                    // if(item.reviews.length !== 0) {
                    //     item.reviews.forEach(r => {
                    //         avg += r.rating;
                    //     });
                    //     avg /= item.reviews.length;
                    // }
                        

                    return(

                    <div className="row" key={i}>
                        <div className="offset-sm-3 col-sm-6">
                            <h3>{item.name}</h3>
                            <p>Style: {item.style}</p>
                            <p>Average Rating: { avg(item.reviews) } stars</p>
                        </div>
                        <div className="col-sm-3">
                            <button className="col-sm-6 btn btn-secondary" onClick={ () => navigate(`/truck/${item._id}/edit`)}>Edit</button>
                            <button className="col-sm-6 btn btn-primary" onClick={ () => navigate(`/truck/${item._id}`) }>Review</button>
                        </div>
                    </div>
                    )
                    })
            }
        </div>
    )
}

export default AllTrucks
