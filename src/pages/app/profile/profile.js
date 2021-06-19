import React from 'react';
import { Navbar } from 'components';
import {
  ProfilePageForm,
  ProfileDetailCard,
  ProfileHeader,
} from './components';

const Profile = ({ section }) => (
  <div className="main-content">
    <Navbar />
    <ProfileHeader />
    <ProfilePageContent section={section} />
  </div>
);

const ProfilePageContent = ({ section }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <ProfileDetailCard selectedNavigationOption={section.text} />
        <ProfilePageForm section={section} />
      </div>
    </div>
  );
};

export default Profile;
