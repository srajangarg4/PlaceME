import React from 'react';
import { Header, Navbar } from 'components';
import Statistics from './statistics';
import RecentJobs from '../job/components/limitedJobs';

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <Header>
        <div className="col-lg-7 col-md-10">
          <h1 className="display-4 text-white">Welcome</h1>
          <br />
          <p className="text-white">
            This is your dashboard. You can see and navigate to various pages
            from here easily.
          </p>
        </div>
      </Header>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-4 order-md-2">
            <Statistics />
          </div>
          <div className="col-12 col-md-8 order-md-1">
            <RecentJobs />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
