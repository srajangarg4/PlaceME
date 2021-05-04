import React from 'react';
import { Card } from '../../../components';

const ProfilePageForm = ({ section, isFormEditable, onToggle }) => {
  const SelectedFormSection = section.view;
  return (
    <div className="col-md-8 order-md-1">
      <Card>
        <div className="card-header p-4 bg-white d-flex justify-content-between align-items-center">
          <h4 className="m-0">My Account</h4>
          <div className="custom-control custom-switch">
            <input
              type="checkbox"
              className="custom-control-input"
              id="edit"
              checked={isFormEditable}
              onChange={() => onToggle(!isFormEditable)}
            />
            <label className="custom-control-label" htmlFor="edit">
              Edit
            </label>
          </div>
        </div>
        <div className="card-body">
          <SelectedFormSection isFormEditable={isFormEditable} />
        </div>
      </Card>
    </div>
  );
};

export default ProfilePageForm;
