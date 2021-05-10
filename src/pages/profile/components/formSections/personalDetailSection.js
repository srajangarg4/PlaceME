import React from 'react';
import { Input } from '../../../../components';
import { useFormReducer } from '../../../../hooks';

const validators = {
  fatherName: [],
  fatherMobile: [],
  fatherOccupation: [],
  motherName: [],
  motherMobile: [],
  motherOccupation: [],
  dob: [],
  area: [],
  state: [],
  district: [],
  city: [],
  pincode: [],
  bloogGroup: [],
  aadhar: [],
  emergencyContact: [],
};

const PersonalDetailSection = ({ isFormEditable }) => {
  const { connectField } = useFormReducer(validators);

  return (
    <form>
      <h6 className="text-muted">Personal Details</h6>
      <div className="py-4 px-md-4">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label for="dob-field">Date of birth</label>
              {connectField('dob', {
                type: 'date',
                id: 'dob-field',
                className: 'form-control',
                disabled: !isFormEditable,
              })(Input)}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label for="blood-group-field">Blood Group</label>
              {connectField('lastName', {
                type: 'text',
                id: 'blood-group-field',
                className: 'form-control',
                disabled: !isFormEditable,
              })(Input)}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label for="father-email-field">Father Name</label>
              {connectField('fatherName', {
                id: 'father-email-field',
                className: 'form-control',
                disabled: !isFormEditable,
              })(Input)}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label for="mother-name-field">Mother Name</label>
              {connectField('motherName', {
                id: 'mother-name-field',
                className: 'form-control',
                disabled: !isFormEditable,
              })(Input)}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label for="father-mobile-field">Father Mobile Number</label>
              {connectField('fatherMobile', {
                id: 'father-mobile-field',
                className: 'form-control',
                disabled: !isFormEditable,
              })(Input)}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label for="mother-mobile-field">Mother Mobile Number</label>
              {connectField('motherMobile', {
                id: 'mother-mobile-field',
                className: 'form-control',
                disabled: !isFormEditable,
              })(Input)}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label for="father-occupation-field">Father Occupation</label>
              {connectField('fatherOccupation', {
                id: 'father-occupation-field',
                className: 'form-control',
                disabled: !isFormEditable,
              })(Input)}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label for="mother-occupation-field">Mother Occupation</label>
              {connectField('motherOccupation', {
                id: 'mother-occupation-field',
                className: 'form-control',
                disabled: !isFormEditable,
              })(Input)}
            </div>
          </div>
        </div>
        {isFormEditable && (
          <input
            type="submit"
            className="btn btn-primary w-100"
            value="Send for update"
          />
        )}
      </div>
    </form>
  );
};

export default PersonalDetailSection;
