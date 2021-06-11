import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, DatePicker, Input, SelectOption } from 'components';
import { useFormReducer } from 'hooks';
import {
  validateName,
  validatePhoneNumber,
  required,
  flattenObject,
  getDifference,
  unflatten,
} from 'utils';
import { bloodGroups } from 'assets';
import { PendingRequestService } from 'placeme-services/lib';

const validators = {
  fatherDetails_name: [required("Father's name is required."), validateName],
  fatherDetails_mobile: [
    required("Father's mobile number is required."),
    validatePhoneNumber,
  ],
  fatherDetails_occupation: [],

  motherDetails_name: [required("Mother's name is required."), validateName],
  motherDetails_mobile: [
    required("Mother's mobile number is required."),
    validatePhoneNumber,
  ],
  motherDetails_occupation: [],

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

const PersonalDetailSection = ({ isFormEditable }) => {
  const personalDetail = useSelector(
    (state) => state?.personalDetail?.[state.user?.email],
  );

  const { connectField, handleSubmit, change } = useFormReducer(validators);

  useEffect(() => {
    const data = flattenObject(personalDetail);
    Object.keys(data).forEach((key) => {
      change(key, data[key]);
    });
  }, [change, personalDetail]);

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        console.log('Data from form', data);
        const changes = getDifference(personalDetail, unflatten(data));
        const updateRequest = new PendingRequestService();
        if (changes !== null) {
          let title = '';

          title = prompt('Enter a message for this update');
          console.log('Title obtained', title);
          if (title) {
            const { successful, error } = await updateRequest.add({
              requestedOn: new Date(),
              updatesRequired: changes,
              studentEmail: data?.email,
              title,
              type: 'PERSONAL',
            });

            if (successful) {
              console.log('Sucessful');
            } else {
              console.log('Erorr', error);
            }
          }
        } else {
          alert('No modification done.');
        }

      })}
    >
      <h4 className="text-muted text-center pb-4">Personal Details</h4>
      <div className="py-4 px-md-4">
        <div className="row">
          <div className="col-12 col-md-6">
            {connectField('dob', {
              className: 'form-control',
              disabled: !isFormEditable,
              label: 'Date of Birth',
            })(DatePicker)}
          </div>
          <div className="col-12 col-md-6">
            {connectField('bloodGroup', {
              type: 'text',
              className: 'form-control',
              disabled: !isFormEditable,
              options: bloodGroups,
              label: 'Blood Group',
            })(SelectOption)}
          </div>
          <div className="col-12 col-md-6">
            {connectField('aadhar_number', {
              className: 'form-control',
              disabled: !isFormEditable,
              label: 'Aadhar',
            })(Input)}
          </div>
          <div className="col-12 col-md-6">
            {connectField('emergencyContact', {
              className: 'form-control',
              disabled: !isFormEditable,
              label: 'Emergency Contact',
            })(Input)}
          </div>
          <h6 className="col-12 py-3 text-muted">Address</h6>
          <div className="col-12 col-md-6">
            {connectField('address_area', {
              className: 'form-control',
              disabled: !isFormEditable,
              label: 'Area',
            })(Input)}
          </div>
          <div className="col-12 col-md-6">
            {connectField('address_city', {
              className: 'form-control',
              disabled: !isFormEditable,
              label: 'City',
            })(Input)}
          </div>
          <div className="col-12 col-md-6">
            {connectField('address_state', {
              className: 'form-control',
              disabled: !isFormEditable,
              label: 'State',
            })(Input)}
          </div>
          <div className="col-12 col-md-6">
            {connectField('address_pincode', {
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
                {connectField('fatherDetails_name', {
                  className: 'form-control',
                  disabled: !isFormEditable,
                  label: 'Name',
                })(Input)}
              </div>
              <div className="col-12">
                {connectField('fatherDetails_mobile', {
                  className: 'form-control',
                  disabled: !isFormEditable,
                  label: 'Mobile Number',
                })(Input)}
              </div>
              <div className="col-12">
                {connectField('fatherDetails_occupation', {
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
                {connectField('motherDetails_name', {
                  className: 'form-control',
                  disabled: !isFormEditable,
                  label: 'Name',
                })(Input)}
              </div>
              <div className="col-12">
                {connectField('motherDetails_mobile', {
                  className: 'form-control',
                  disabled: !isFormEditable,
                  label: 'Mobile Number',
                })(Input)}
              </div>
              <div className="col-12">
                {connectField('motherDetails_occupation', {
                  className: 'form-control',
                  disabled: !isFormEditable,
                  label: 'Occupation',
                })(Input)}
              </div>
            </div>
          </div>
        </div>
        {isFormEditable && (
          <Button type="submit" fullWidth text="Send for update" />
        )}
      </div>
    </form>
  );
};

export default PersonalDetailSection;
