import React from 'react';
import { Router, Link } from '@reach/router';
import './App.css';
import NewTruck from './components/NewTruck';
import AllTrucks from './components/AllTrucks';
import EditTruck from './components/EditTruck';
import OneTruck from './components/OneTruck';

function App() {
  return (
    <div className="container">
      <h1 className="text-center">Food Trucks</h1>
      <div className="row">
        
          <Link className="col-sm-3" to="/"><button className="btn btn-primary">Dashboard</button></Link>
          <Link className="col-sm-3" to="/truck/new"><button className="btn btn-primary">New Truck</button></Link>
      </div>
      <Router>
        <AllTrucks path="/"/>
        <EditTruck path="/truck/:id/edit"/>
        <OneTruck path="/truck/:id"/>
        <NewTruck path="/truck/new"/>
      </Router>
    </div>
  );
}

export default App;
