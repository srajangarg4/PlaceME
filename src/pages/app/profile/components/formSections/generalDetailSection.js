import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Input } from 'components';
import { useFormReducer } from 'hooks';
import {
  required,
  validateEmail, validateFirstName, validateLastName, validatePhoneNumber
} from 'utils';

const validators = {
  firstName: [required('First Name is required'), validateFirstName],
  lastName: [required('Last Name is required'), validateLastName],
  email: [required('Email is required'), validateEmail],
  phoneNumber: [required('Phone Number is required'), validatePhoneNumber],
};

const GeneralDetailSection = ({ isFormEditable }) => {
  const { connectField, handleSubmit, change } = useFormReducer(validators);

  const user = useSelector((state) => state.user);
  useEffect(() => {
    const data = {
      firstName: user?.name?.firstName ?? '',
      lastName: user?.name?.lastName ?? '',
      email: user?.email ?? '',
      phoneNumber: user?.mobile ?? '',
    };
    Object.keys(data).forEach((key) => {
      change(key, data[key]);
    });
  }, [user, change]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log('General Detail data', data);
      })}
    >
      <h6 className="text-muted">General Information</h6>
      <div className="py-4 px-md-4">
        <div className="row">
          <div className="col-12 col-md-6">
            {connectField('firstName', {
              type: 'text',
              id: 'first-name',
              className: 'form-control',
              disabled: !isFormEditable,
              label: 'First Name',
            })(Input)}
          </div>
          <div className="col-12 col-md-6">
            {connectField('lastName', {
              type: 'text',
              id: 'last-name',
              className: 'form-control',
              disabled: !isFormEditable,
              label: 'Last Name',
            })(Input)}
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6">
            {connectField('email', {
              type: 'email',
              id: 'email',
              className: 'form-control',
              disabled: true,
              label: 'Email',
            })(Input)}
          </div>
          <div className="col-12 col-md-6">
            {connectField('phoneNumber', {
              type: 'text',
              id: 'phone-number',
              className: 'form-control',
              disabled: !isFormEditable,
              label: 'Mobile',
            })(Input)}
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

export default GeneralDetailSection;
