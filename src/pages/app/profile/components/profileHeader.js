import React from 'react';
import '../../../../gradients.css';

const ProfileHeader = () => {
  return (
    <div className="jumbotron light-blue" style={{ borderRadius: '0px' }}>
      <div className="d-flex align-items-center">
        {/* Header Container */}
        <div className="container d-flex align-items-center">
          <div className="row">
            <div className="col-lg-7 col-md-10">
              <h1 className="display-4 text-white">Hello Srajan, </h1>
              <br />
              <p className="text-white">
                This is your profile page. You can see the progress you've made
                with your work and manage your projects or assigned tasks
              </p>
              {/* <Link className="btn btn-info">Edit Profile</Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
