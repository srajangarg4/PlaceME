import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Input, SelectOption } from 'components';
import { useFormReducer } from 'hooks';
import {
  validateName,
  validatePhoneNumber,
  required,
  getFormattedDate,
  // flattenObject,
} from 'utils';
import { bloodGroups } from 'assets';

const validators = {
  father_name: [required("Father's name is required."), validateName],
  father_mobile: [
    required("Father's mobile number is required."),
    validatePhoneNumber,
  ],
  father_occupation: [],

  mother_name: [required("Mother's name is required."), validateName],
  mother_mobile: [validatePhoneNumber],
  mother_occupation: [],

  dob: [required('Date of birth is required.')],
  address_area: [required('Area is required.')],
  address_state: [required('State is required.')],
  address_district: [required('District is required.')],
  address_city: [required('City is required.')],
  address_pincode: [required('Pin code is required.')],

  bloodGroup: [required('Blood group is required.')],

  aadhar_number: [required('Aadhar is required.')],
  aadhar_url: [],

  emergencyContact: [
    required('Emergency Contact is required.'),
    validatePhoneNumber,
  ],
};

const getDefaultValues = (personalDetail) => ({
  dob: getFormattedDate('yyyy-mm-dd', new Date(personalDetail?.dob?.toDate())),
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

  useEffect(() => {
    // const data = flattenObject(personalDetail);
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
            {/* {connectField('aadhar_number', { */}
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
            {/* {connectField('address_area', { */}
            {connectField('area', {
              id: 'area-field',
              className: 'form-control',
              disabled: !isFormEditable,
              label: 'Area',
            })(Input)}
          </div>
          <div className="col-12 col-md-6">
            {/* {connectField('address_city', { */}
            {connectField('city', {
              id: 'city-field',
              className: 'form-control',
              disabled: !isFormEditable,
              label: 'City',
            })(Input)}
          </div>
          <div className="col-12 col-md-6">
            {/* {connectField('address_state', { */}
            {connectField('state', {
              id: 'state-field',
              className: 'form-control',
              disabled: !isFormEditable,
              label: 'State',
            })(Input)}
          </div>
          <div className="col-12 col-md-6">
            {/* {connectField('address_pincode', { */}
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
                {/* {connectField('father_name', { */}
                {connectField('fatherName', {
                  id: 'father-email-field',
                  className: 'form-control',
                  disabled: !isFormEditable,
                  label: 'Name',
                })(Input)}
              </div>
              <div className="col-12">
                {/* {connectField('father_mobile', { */}
                {connectField('fatherMobile', {
                  id: 'father-mobile-field',
                  className: 'form-control',
                  disabled: !isFormEditable,
                  label: 'Mobile Number',
                })(Input)}
              </div>
              <div className="col-12">
                {/* {connectField('father_occupation', { */}
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
                {/* {connectField('mother_name', { */}
                {connectField('motherName', {
                  id: 'mother-name-field',
                  className: 'form-control',
                  disabled: !isFormEditable,
                  label: 'Name',
                })(Input)}
              </div>
              <div className="col-12">
                {/* {connectField('mother_mobile', { */}
                {connectField('motherMobile', {
                  id: 'mother-mobile-field',
                  className: 'form-control',
                  disabled: !isFormEditable,
                  label: 'Mobile Number',
                })(Input)}
              </div>
              <div className="col-12">
                {/* {connectField('mother_occupation', { */}
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
