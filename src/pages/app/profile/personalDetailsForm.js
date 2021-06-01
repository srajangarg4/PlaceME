import React from 'react';
import { useFormReducer } from 'hooks';
import { Input } from 'components';
import { required, validatePassword, confirmPasswordValidator } from 'utils';

const validators = {
  firstName: [required('First Name is required')],
  lastName: [required('Last Name is required')],
  email: [required('Email is required')],
  phoneNumber: [required('Phone Number is required')],
  password: [required('Password is required'), validatePassword],
  confPassword: [
    required('Confirm Password is required'),
    confirmPasswordValidator,
  ],
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

const PersonalDetailsFrom = () => {
  const { connectField, handleSubmit } = useFormReducer(validators);
  return (
    <div className="min-vh-100" style={{ backgroundColor: '#d0d0ce' }}>
      <div className="align-items-center justify-content-center">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-12 col-md-6">
                <form
                  className="p-5"
                  onSubmit={handleSubmit((data) => {
                    console.log('Data', data);
                  })}
                >
                  <PersonalDetailsFields connectField={connectField} />
                  <ParentDetailsFields
                    connectField={connectField}
                    relation="father"
                  />
                  <ParentDetailsFields
                    connectField={connectField}
                    relation="mother"
                  />

                  <AddressDetailsFields connectField={connectField} />

                  <button
                    className="btn btn-primary btn-block my-3"
                    type="submit"
                  >
                    Create your account
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddressDetailsFields = ({ connectField }) => {
  return (
    <div>
      <div className="row">
        {connectField('state', {
          className: 'form-control',
          placeholder: 'State',
          styles: 'col my-2',
        })(Input)}
      </div>
      <div className="row">
        {connectField('district', {
          className: 'form-control',
          placeholder: 'District',
          styles: 'col my-2',
        })(Input)}
      </div>
      <div className="row">
        {connectField('area', {
          className: 'form-control',
          placeholder: 'Area',
          styles: 'col my-2',
        })(Input)}
      </div>
    </div>
  );
};

const PersonalDetailsFields = ({ connectField }) => {
  return (
    <div>
      <div className="row">
        {connectField('dob', {
          className: 'form-control',
          placeholder: 'Date of birth',
          type: 'date',
          styles: 'col my-2',
        })(Input)}
      </div>

      <div className="row">
        {connectField('bloogGroup', {
          className: 'form-control',
          placeholder: 'Blood Group',
          styles: 'col my-2',
        })(Input)}
      </div>
    </div>
  );
};

const ParentDetailsFields = ({ connectField, relation }) => {
  return (
    <div>
      <div className="row">
        {connectField(`${relation}Name`, {
          className: 'form-control',
          placeholder: `${relation}s Name`,
          styles: 'col my-2',
        })(Input)}
      </div>
      <div className="row">
        {connectField(`${relation}Mobile`, {
          className: 'form-control',
          placeholder: `${relation}s Mobile number`,
          styles: 'col my-2',
        })(Input)}
      </div>
      <div className="row">
        {connectField(`${relation}Occupation`, {
          className: 'form-control',
          placeholder: `${relation}s Occupation`,
          styles: 'col my-2',
        })(Input)}
      </div>
    </div>
  );
};
export default PersonalDetailsFrom;
