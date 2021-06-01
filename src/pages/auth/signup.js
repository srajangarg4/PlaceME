import React from 'react';
import { useDispatch } from 'react-redux';
import { useDatabase, useFormReducer } from 'hooks';
import { Input, Button } from 'components';
import {
  required,
  validatePassword,
  confirmPasswordValidator,
  Roles,
  validateEmail,
} from 'utils';
import { UserService } from 'placeme-services/lib';
import { login } from 'actions';

const validators = {
  firstName: [required('First Name is required')],
  lastName: [required('Last Name is required')],
  email: [required('Email is required'), validateEmail],
  phoneNumber: [required('Phone Number is required')],
  password: [required('Password is required'), validatePassword],
  confPassword: [
    required('Confirm Password is required'),
    confirmPasswordValidator,
  ],
};

const signupUser = ({ user, password }) => {
  return UserService.signupUser(user, password);
};

const formatUser = ({
  email,
  firstName,
  lastName,
  phoneNumber,
  middleName,
}) => {
  const user = {
    email,
    mobile: phoneNumber,
    name: {
      firstName,
      middleName: middleName ?? null,
      lastName,
    },
    role: Roles.STUDENT,
    otherDetails: {},
  };
  return user;
};

const Signup = () => {
  const { connectField, handleSubmit } = useFormReducer(validators);
  const { callDatabase, loading } = useDatabase(signupUser);
  const dispatch = useDispatch();
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
                  onSubmit={handleSubmit((formData) => {
                    const user = formatUser(formData);
                    const { password } = formData;
                    callDatabase(
                      (data) => {
                        console.log('After signup', data);
                        dispatch(login(data));
                      },
                      (error) => {
                        console.error('Something went wrong', error);
                      },
                      { user, password },
                    );
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
                  <Button
                    text="Create Account"
                    type="submit"
                    loading={loading}
                  />
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
