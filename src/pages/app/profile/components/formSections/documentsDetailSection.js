import React from 'react';
import { Button, File, Input } from '../../../../../components';
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
            {connectField('firstName', {
              type: 'text',
              id: 'first-name',
              className: 'form-control',
              label: 'First Name',
              disabled: !isFormEditable,
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
              disabled: !isFormEditable,
              label: 'Email',
            })(Input)}
          </div>
          <div className="col-12 col-md-6">
            {connectField('phoneNumber', {
              id: 'phone-number',
              className: 'form-control-file',
              disabled: !isFormEditable,
              label: 'Mobile',
            })(File)}
          </div>
        </div>
        <div>
          {isFormEditable && (
            <Button text="Send for update" fullWidth type="submit" />
          )}
        </div>
      </div>
    </form>
  );
};

export default DocumentsDetailSection;
