import React from 'react'
import { navigate } from '@reach/router';


const TruckForm = props => {
    const { truck, changeHandler, errors, action, deleteHandler } = props;


    return (
        <>
            <div className="form-group row">
                {
                    errors.name ?
                    <span className="offset-sm-4 col-sm-8 text-danger">{errors.name.message}</span>
                    :
                    ''
                }
                <label htmlFor="name" className="col-sm-4">Name: </label>
                <input type="text" name="name" onChange={ changeHandler } className="col-sm-8 form-control" value={ truck.name }/>
            </div>
            <div className="form-group row">
                {
                    errors.style ?
                    <span className="offset-sm-4 col-sm-8 text-danger">{errors.style.message}</span>
                    :
                    ''
                }
                <label htmlFor="style" className="col-sm-4">Style: </label>
                <input type="text" name="style" onChange={ changeHandler } className="col-sm-8 form-control" value={ truck.style }/>
            </div>
            <div className="form-group row">
                {
                    errors.description ?
                    <span className="offset-sm-4 col-sm-8 text-danger">{errors.description.message}</span>
                    :
                    ''
                }
                <label htmlFor="description" className="col-sm-4">Description: </label>
                <input type="text" name="description" onChange={ changeHandler } className="col-sm-8 form-control" value={ truck.description }/>
            </div>
            <div className="form-group row">
                {
                    action === "edit" ?
                    <>
                        <button type="button" onClick={ deleteHandler }className="offset-sm-6 col-sm-2 btn btn-danger">Delete</button>
                        <button type="button" onClick={ () => navigate('/') } className="col-sm-2 btn btn-secondary">Cancel</button>
                        <button type="submit" className="col-sm-2 btn btn-primary">Update</button>
                    </>
                    :
                    <>
                        <button type="button" onClick={ () => navigate('/') } className="offset-sm-8 col-sm-2 btn btn-secondary">Cancel</button>
                        <button type="submit" className="col-sm-2 btn btn-primary">Submit</button>
                    </>
                }
                
            </div>
        </>
    )
}

export default TruckForm
