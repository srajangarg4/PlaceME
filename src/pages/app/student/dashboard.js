import React from 'react';
import { Navbar } from 'components';
import { ProfileHeader } from '../profile/components';
import Statistics from './statistics';
import RecentJobs from '../job/components/limitedJobs';

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <ProfileHeader />
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
