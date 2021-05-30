import React from 'react';
import { File, Input } from '../../../../../components';
import { useFormReducer } from '../../../../../hooks';
import { required } from '../../../../../utils';

const validators = {
  firstName: [required('First Name is required')],
  lastName: [required('Last Name is required')],
  email: [required('Email is required')],
  phoneNumber: [required('Phone Number is required')],
};

const DocumentsDetailSection = ({ isFormEditable }) => {
  const { connectField, handleSubmit } = useFormReducer(validators);
  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log('Documents data', data);
      })}
    >
      <h6 className="text-muted">Document Information</h6>
      <div className="py-4 px-md-4">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="first-name">First Name</label>
              {connectField('firstName', {
                type: 'text',
                id: 'first-name',
                className: 'form-control',
                disabled: !isFormEditable,
              })(Input)}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="last-name">Last Name</label>
              {connectField('lastName', {
                type: 'text',
                id: 'last-name',
                className: 'form-control',
                disabled: !isFormEditable,
              })(Input)}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              {connectField('email', {
                type: 'email',
                id: 'email',
                className: 'form-control',
                disabled: !isFormEditable,
              })(Input)}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="phone-number">Mobile</label>
              {connectField('phoneNumber', {
                id: 'phone-number',
                className: 'form-control-file',
                disabled: !isFormEditable,
              })(File)}
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

export default DocumentsDetailSection;
