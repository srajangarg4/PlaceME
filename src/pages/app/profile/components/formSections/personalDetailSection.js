import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Input, SelectOption } from 'components';
import { useFormReducer } from 'hooks';
import {
  validateName,
  validatePhoneNumber,
  required,
  bloodGroups,
  resolveDate,
  getFormattedDate,
} from 'utils';

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

  const { connectField, handleSubmit, change } = useFormReducer(validators);

  // for autofill vales when data is fetched form firebase
  useEffect(() => {
    const data = getDefaultValues(personalDetail);
    Object.keys(data).forEach((key) => {
      change(key, data[key]);
    });
  }, [change, personalDetail]);

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
            {connectField('dob', {
              type: 'date',
              id: 'dob-field',
              className: 'form-control',
              disabled: !isFormEditable,
              label: 'Date of Birth',
            })(Input)}
          </div>
          <div className="col-12 col-md-6">
            {connectField('bloodGroup', {
              type: 'text',
              id: 'blood-group-field',
              className: 'form-control',
              disabled: !isFormEditable,
              options: bloodGroups,
              label: 'Blood Group',
            })(SelectOption)}
          </div>
          <div className="col-12 col-md-6">
            {connectField('aadhar', {
              id: 'aadhar-field',
              className: 'form-control',
              disabled: !isFormEditable,
              label: 'Aadhar',
            })(Input)}
          </div>
          <div className="col-12 col-md-6">
            {connectField('emergencyContact', {
              id: 'emergency-contact-field',
              className: 'form-control',
              disabled: !isFormEditable,
              label: 'Emergency Contact',
            })(Input)}
          </div>
          <h6 className="col-12 py-3 text-muted">Address</h6>
          <div className="col-12 col-md-6">
            {connectField('area', {
              id: 'area-field',
              className: 'form-control',
              disabled: !isFormEditable,
              label: 'Area',
            })(Input)}
          </div>
          <div className="col-12 col-md-6">
            {connectField('city', {
              id: 'city-field',
              className: 'form-control',
              disabled: !isFormEditable,
              label: 'City',
            })(Input)}
          </div>
          <div className="col-12 col-md-6">
            {connectField('state', {
              id: 'state-field',
              className: 'form-control',
              disabled: !isFormEditable,
              label: 'State',
            })(Input)}
          </div>
          <div className="col-12 col-md-6">
            {connectField('pincode', {
              id: 'pincode-field',
              className: 'form-control',
              disabled: !isFormEditable,
              label: 'Pincode',
            })(Input)}
          </div>
          <div className="col-12 col-md-6">
            <div className="row py-3">
              <h6 className="col-12 text-muted">Father Details</h6>
            </div>
            <div className="row">
              <div className="col-12">
                {connectField('fatherName', {
                  id: 'father-email-field',
                  className: 'form-control',
                  disabled: !isFormEditable,
                  label: 'Name',
                })(Input)}
              </div>
              <div className="col-12">
                {connectField('fatherMobile', {
                  id: 'father-mobile-field',
                  className: 'form-control',
                  disabled: !isFormEditable,
                  label: 'Mobile Number',
                })(Input)}
              </div>
              <div className="col-12">
                {connectField('fatherOccupation', {
                  id: 'father-occupation-field',
                  className: 'form-control',
                  disabled: !isFormEditable,
                  label: 'Occupation',
                })(Input)}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="row py-3">
              <h6 className="col-12 text-muted">Mother Details</h6>
            </div>
            <div className="row">
              <div className="col-12">
                {connectField('motherName', {
                  id: 'mother-name-field',
                  className: 'form-control',
                  disabled: !isFormEditable,
                  label: 'Name',
                })(Input)}
              </div>
              <div className="col-12">
                {connectField('motherMobile', {
                  id: 'mother-mobile-field',
                  className: 'form-control',
                  disabled: !isFormEditable,
                  label: 'Mobile Number',
                })(Input)}
              </div>
              <div className="col-12">
                {connectField('motherOccupation', {
                  id: 'mother-occupation-field',
                  className: 'form-control',
                  disabled: !isFormEditable,
                  label: 'Occupation',
                })(Input)}
              </div>
            </div>
          </div>
        </div>
        {isFormEditable && (
          <Button
            type="submit"
            fullWidth
            className="btn-primary"
            text="Send for update"
          />
        )}
      </div>
    </form>
  );
};

export default PersonalDetailSection;
