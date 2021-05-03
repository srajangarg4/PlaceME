import React from 'react';
import { useFormReducer } from '../../hooks';
import { Input } from '../../components';
import {
  required,
  validatePassword,
  confirmPasswordValidator,
} from '../../utils';

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
};

const Signup = () => {
  // #d0d0ce
  const { connectField, handleSubmit } = useFormReducer(validators);
  return (
    <div
      className="row align-items-center justify-content-center m-0 min-vh-100"
      style={{ backgroundColor: 'rgb(208 208 206 / 0%)' }}
    >
      <div className="col-sm-8">
        <div
          className="card px-md-5 py-md-3 shadow-lg bg-white rounded m-0"
          style={{ borderRadius: '15px' }}
        >
          <div className="row">
            <div className="col-12 col-sm-5 align-self-center">
              <img
                src="https://res.cloudinary.com/mhmd/image/upload/v1569543678/form_d9sh6m.svg"
                alt=""
                className="img-fluid p-3"
              />
              <h2 className="text-center">Sign Up</h2>
            </div>
            <div className="col-12 col-sm">
              <div className="card-body">
                <form
                  className="p-1"
                  onSubmit={handleSubmit((data) => {
                    console.log('Data', data);
                  })}
                >
                  <div className="row">
                    {connectField('firstName', {
                      className: 'form-control',
                      placeholder: 'First Name',
                      styles: 'col-lg-6 my-2',
                      iconName: 'person',
                    })(Input)}

                    {connectField('lastName', {
                      className: 'form-control',
                      placeholder: 'Last Name',
                      styles: 'col-lg-6 my-2',
                      iconName: 'person',
                    })(Input)}
                  </div>
                  <div className="row">
                    {connectField('email', {
                      className: 'form-control',
                      placeholder: 'Email',
                      styles: 'col my-2',
                      iconName: 'email',
                    })(Input)}
                  </div>
                  <div className="row">
                    {connectField('phoneNumber', {
                      className: 'form-control',
                      placeholder: 'Mobile',
                      styles: 'col my-2',
                      iconName: 'phone',
                    })(Input)}
                  </div>
                  <div className="row">
                    {connectField('phoneNumber', {
                      className: 'form-control',
                      placeholder: 'Mobile',
                      iconName: 'perm_contact_calendar',
                      styles: 'col my-2',
                    })(Input)}
                  </div>
                  <div className="row">
                    {connectField('password', {
                      className: 'form-control',
                      placeholder: 'Password',
                      iconName: 'lock',
                      styles: 'col-lg-6 my-2',
                    })(Input)}

                    {connectField('confPassword', {
                      className: 'form-control',
                      placeholder: 'Confirm Password',
                      iconName: 'lock',
                      styles: 'col-lg-6 my-2',
                    })(Input)}
                  </div>
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

export default Signup;
