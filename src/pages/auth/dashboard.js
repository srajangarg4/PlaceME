import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar } from '../../components';
const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <WelcomeJumbo />
      <div className="container">
        <div className="row">
          <div className="col">
            <CardComponent />
          </div>
          <div className="col">
            <CardComponent />
          </div>
          <div className="col">
            <CardComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

const WelcomeJumbo = () => {
  return (
    <div className="jumbotron">
      <div className="row row-header">
        <div className="col-12 col-sm-6">
          <h1>
            Welcome Srajan
            <span className="material-icons ">sentiment_satisfied_alt</span>
          </h1>
          <p>
            Move your carrer in right direction with various job opportunities
          </p>
        </div>
      </div>
    </div>
  );
};

const CardComponent = () => {
  return (
    <div className="card">
      <div className="card-header bg-white">
        <div className="row justify-content-between">
          <div className="col-auto">
            <h4>
              <span className="badge badge-pill badge-success">full time</span>
            </h4>
          </div>
          <div className="col-auto">
            <h4>
              <span className="badge badge-pill badge-warning">3000000</span>
            </h4>
          </div>
        </div>
      </div>
      <div className="card-body text-center">
        <div className="d-block">
          <h3 className="card-title">Software Engineer</h3>
          <small className="text-info">Nagarro software pvt ltd</small>
        </div>
        <div className="col-auto">
          <ul className="list-inline">
            <li className="list-inline-item">
              <span className="badge badge-pill badge-info">OOPs</span>
            </li>
            <li className="list-inline-item">
              <span className="badge badge-pill badge-info">DSA</span>
            </li>
            <li className="list-inline-item">
              <span className="badge badge-pill badge-info">C/C++</span>
            </li>
            <li className="list-inline-item">
              <button className="btn badge badge-pill badge-primary">+4</button>
            </li>
          </ul>
          <div className="d-flex row mb-0">
            <div className="col">
              <p className="text-muted">
                We are looking for an experience UI and UX designer to work on
                our projects...
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <hr className="align-content-center w-25" />
      </div>
      <div className="card-footer border-0 bg-white text-center mx-auto ">
        <h5 className="footer">
          <Link href="" className="text-decoration-none">
            VIEW JOB
          </Link>
        </h5>
      </div>
    </div>
  );
};

export default Dashboard;
