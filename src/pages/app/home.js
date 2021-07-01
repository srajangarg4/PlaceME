import React from 'react';
import { Login } from '../auth';

const Home = () => {
  return (
    <div className="card text-center">
      <div className="card-body p-0">
        <div className="row">
          <div className="col-12 col-md-6">
            <img src="./Business_SVG.svg" className="img-fluid" alt="" />
          </div>
          <div className="col-12 col-md-6">
            <div className="d-flex align-items-center h-100 w-100">
              <Login />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
