import React, { useState } from 'react';
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
  const [isFormEditable, setIsFormEditable] = useState(false);
  return (
    <div className="container-fluid">
      <div className="row">
        <ProfileDetailCard selectedNavigationOption={section.text} />
        <ProfilePageForm
          section={section}
          isFormEditable={isFormEditable}
          onToggle={(option) => {
            setIsFormEditable(option);
          }}
        />
      </div>
    </div>
  );
};

export default Profile;
