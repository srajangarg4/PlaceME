import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Navbar } from '../../components';
import Statistics from './statistics';
const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-8">
            <Card>
              <div className="card-header bg-white">
                <h5 className="text-center">Recent Jobs</h5>
              </div>
              <div className="card-body mx-3">
                <JobTitleCard />
                <JobTitleCard />
                <JobTitleCard />
              </div>
              <div className="card-footer bg-white">
                <h6 className="text-muted text-center">See More</h6>
              </div>
            </Card>
          </div>
          <div className="col-12 col-md">
            <Statistics />
          </div>
        </div>
      </div>
    </div>
  );
};

const JobTitleCard = () => {
  return (
    <div className="card shadow bg-white my-5">
      <div className="card-body">
        <div className="row d-flex justify-content-between">
          <div className="col-12 col-md">
            <div className="d-flex align-items-center">
              <div className="p-2 p-sm-3 mr-3 mr-sm-5">
                <img
                  src="https://preview.colorlib.com/theme/jobsco/assets/img/icon/1.svg"
                  alt=""
                />
              </div>
              <div>
                <h3 className="text-capitalize">Software Engineer</h3>
                <div className="row">
                  <div className="col-auto my-1">
                    <i className="text-muted d-flex align-items-center">
                      <span className="material-icons">place</span>
                      Califonia, USA
                    </i>
                  </div>
                  <div className="col-auto my-1">
                    <i className="text-muted d-flex align-items-center">
                      <span className="material-icons">schedule</span>
                      Full-Time
                    </i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-auto d-flex align-items-center my-3">
            <button className="btn btn-block btn-outline-dark" type="submit">
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
