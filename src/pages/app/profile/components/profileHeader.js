import React from 'react';
import 'gradients.css';
import { Header } from 'components';

const ProfileHeader = () => {
  return (
    <Header>
      <div className="col-lg-7 col-md-10">
        <h1 className="display-4 text-white">Manage Your Profile</h1>
        <br />
        <p className="text-white">
          This is your profile page. You can see and edit your documents,
          academic and personal details and request easily for updates.
        </p>
      </div>
    </Header>
  );
};

export default ProfileHeader;
