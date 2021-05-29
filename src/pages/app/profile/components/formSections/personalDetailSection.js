import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Input, SelectOption } from '../../../../../components';
import { useFormReducer } from '../../../../../hooks';
import {
  validateName,
  validatePhoneNumber,
  required,
  bloodGroups,
  resolveDate,
  getFormattedDate,
} from '../../../../../utils';

const validators = {
  fatherName: [required("Father's name is required."), validateName],
  fatherMobile: [
    required("Father's mobile number is required."),
    validatePhoneNumber,
  ],
  fatherOccupation: [],
  motherName: [required("Mother's name is required."), validateName],
  motherMobile: [validatePhoneNumber],
  motherOccupation: [],
  dob: [required('Date of birth is required.')],
  area: [required('Area is required.')],
  state: [required('State is required.')],
  district: [required('District is required.')],
  city: [required('City is required.')],
  pincode: [required('Pin code is required.')],
  bloodGroup: [required('Blood group is required.')],
  aadhar: [required('Aadhar is required.')],
  emergencyContact: [
    required('Emergency Contact is required.'),
    validatePhoneNumber,
  ],
};

const getDefaultValues = (personalDetail) => ({
  dob: getFormattedDate('yyyy-mm-dd', resolveDate(personalDetail?.dob)),
  aadhar: personalDetail?.aadhar?.number ?? '',
  bloodGroup: personalDetail?.bloodGroup ?? '',
  emergencyContact: '' + personalDetail?.emergencyContact ?? '',
  fatherName: personalDetail?.fatherDetails?.name ?? '',
  fatherMobile: '' + personalDetail?.fatherDetails?.mobile ?? '',
  fatherOccupation: personalDetail?.fatherDetails?.occupation ?? '',
  motherName: personalDetail?.motherDetails?.name ?? '',
  motherMobile: '' + personalDetail?.motherDetails?.mobile ?? '',
  motherOccupation: personalDetail?.motherDetails?.occupation ?? '',
  area: personalDetail?.address?.area ?? '',
  city: personalDetail?.address?.city ?? '',
  district: personalDetail?.address?.district ?? '',
  state: personalDetail?.address?.state ?? '',
  pincode: personalDetail?.address?.pincode ?? '',
});

const PersonalDetailSection = ({ isFormEditable }) => {
  const personalDetail = useSelector(
    (state) => state?.personalDetail?.[state.user?.email],
  );

  const { connectField, handleSubmit } = useFormReducer(
    validators,
    getDefaultValues(personalDetail),
  );

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <h4 className="text-muted text-center pb-4">Personal Details</h4>
      <div className="py-4 px-md-4">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="dob-field" className="text-muted">
                Date of Birth
              </label>
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
              <label htmlFor="blood-group-field" className="text-muted">
                Blood Group
              </label>
              {connectField('bloodGroup', {
                type: 'text',
                id: 'blood-group-field',
                className: 'form-control',
                disabled: !isFormEditable,
                options: bloodGroups,
              })(SelectOption)}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="aadhar-field" className="text-muted">
                Aadhar
              </label>
              {connectField('aadhar', {
                id: 'aadhar-field',
                className: 'form-control',
                disabled: !isFormEditable,
              })(Input)}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="emergency-contact-field" className="text-muted">
                Emergency Contact
              </label>
              {connectField('emergencyContact', {
                id: 'emergency-contact-field',
                className: 'form-control',
                disabled: !isFormEditable,
              })(Input)}
            </div>
          </div>
          <h6 className="col-12 py-3 text-muted">Address</h6>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="area-field" className="text-muted">
                Area
              </label>
              {connectField('area', {
                id: 'area-field',
                className: 'form-control',
                disabled: !isFormEditable,
              })(Input)}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="city-field" className="text-muted">
                City
              </label>
              {connectField('city', {
                id: 'city-field',
                className: 'form-control',
                disabled: !isFormEditable,
              })(Input)}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="state-field" className="text-muted">
                State
              </label>
              {connectField('state', {
                id: 'state-field',
                className: 'form-control',
                disabled: !isFormEditable,
              })(Input)}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="pincode-field" className="text-muted">
                Pincode
              </label>
              {connectField('pincode', {
                id: 'pincode-field',
                className: 'form-control',
                disabled: !isFormEditable,
              })(Input)}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="row py-3">
              <h6 className="col-12 text-muted">Father Details</h6>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="father-email-field" className="text-muted">
                    Name
                  </label>
                  {connectField('fatherName', {
                    id: 'father-email-field',
                    className: 'form-control',
                    disabled: !isFormEditable,
                  })(Input)}
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="father-mobile-field" className="text-muted">
                    Mobile Number
                  </label>
                  {connectField('fatherMobile', {
                    id: 'father-mobile-field',
                    className: 'form-control',
                    disabled: !isFormEditable,
                  })(Input)}
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label
                    htmlFor="father-occupation-field"
                    className="text-muted"
                  >
                    Occupation
                  </label>
                  {connectField('fatherOccupation', {
                    id: 'father-occupation-field',
                    className: 'form-control',
                    disabled: !isFormEditable,
                  })(Input)}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="row py-3">
              <h6 className="col-12 text-muted">Mother Details</h6>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="mother-name-field" className="text-muted">
                    Name
                  </label>
                  {connectField('motherName', {
                    id: 'mother-name-field',
                    className: 'form-control',
                    disabled: !isFormEditable,
                  })(Input)}
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="mother-mobile-field" className="text-muted">
                    Mobile Number
                  </label>
                  {connectField('motherMobile', {
                    id: 'mother-mobile-field',
                    className: 'form-control',
                    disabled: !isFormEditable,
                  })(Input)}
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label
                    htmlFor="mother-occupation-field"
                    className="text-muted"
                  >
                    Occupation
                  </label>
                  {connectField('motherOccupation', {
                    id: 'mother-occupation-field',
                    className: 'form-control',
                    disabled: !isFormEditable,
                  })(Input)}
                </div>
              </div>
            </div>
          </div>
        </div>
        {isFormEditable && (
          <Button
            type="submit"
            expand
            className="btn-primary"
            text="Send for update"
          />
        )}
      </div>
    </form>
  );
};

export default PersonalDetailSection;
