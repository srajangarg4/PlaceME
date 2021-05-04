import React, { useState } from 'react';
import { Navbar } from '../../components';
import {
  ProfilePageForm,
  ProfileDetailCard,
  ProfileHeader,
} from './components';
import { formSections } from './utils';

// https://www.creative-tim.com/bits/bootstrap/user-profile-page-argon-dashboard
// https://uicookies.com/bootstrap-cards/
// https://stackoverflow.com/questions/18815157/how-to-overlay-image-with-color-in-css

const Profile = () => (
  <div className="main-content">
    <Navbar />
    <ProfileHeader />
    <ProfilePageContent />
  </div>
);

const ProfilePageContent = () => {
  const [section, setSection] = useState(formSections.general);
  const [isFormEditable, setIsFormEditable] = useState(false);
  return (
    <div className="container-fluid">
      <div className="row">
        <ProfileDetailCard
          selectedNavigationOption={section.text}
          onClickSection={(option) => {
            setSection(option);
          }}
        />
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
