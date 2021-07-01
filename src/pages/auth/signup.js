import React from 'react';
import { useDispatch } from 'react-redux';
import { useDatabase, useFormReducer } from 'hooks';
import { Input, Button } from 'components';
import {
  required,
  validatePassword,
  confirmPasswordValidator,
  Role,
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePhoneNumber,
} from 'utils';
import { UserService } from 'placeme-services/lib';
import { login } from 'actions';
import { showError, showSuccess } from 'components/toast';

const validators = {
  firstName: [required('First Name is required'), validateFirstName],
  lastName: [required('Last Name is required'), validateLastName],
  email: [required('Email is required'), validateEmail],
  phoneNumber: [required('Phone Number is required'), validatePhoneNumber],
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
    role: Role.STUDENT,
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
            <div className="col-12 col-sm-5 align-items-center">
              <img src="./signup.png" alt="hihkhkh" className="img-fluid p-3" />
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
                        showSuccess('You have successfully Sign Up in');
                        dispatch(login(data));
                      },
                      showError,
                      { user, password },
                    );
                  })}
                >
                  <div className="row">
                    {connectField('firstName', {
                      placeholder: 'First Name',
                      containerClassName: 'col-lg-6 my-2',
                      iconName: 'person',
                    })(Input)}

                    {connectField('lastName', {
                      placeholder: 'Last Name',
                      containerClassName: 'col-lg-6 my-2',
                      iconName: 'person',
                    })(Input)}
                  </div>
                  <div className="row">
                    {connectField('email', {
                      placeholder: 'Email',
                      containerClassName: 'col my-2',
                      iconName: 'email',
                    })(Input)}
                  </div>
                  <div className="row">
                    {connectField('phoneNumber', {
                      placeholder: 'Mobile',
                      containerClassName: 'col my-2',
                      iconName: 'phone',
                    })(Input)}
                  </div>
                  <div className="row">
                    {connectField('password', {
                      placeholder: 'Password',
                      iconName: 'lock',
                      containerClassName: 'col-lg-6 my-2',
                    })(Input)}

                    {connectField('confPassword', {
                      placeholder: 'Confirm Password',
                      iconName: 'lock',
                      containerClassName: 'col-lg-6 my-2',
                    })(Input)}
                  </div>
                  <Button
                    buttonClassName="btn-primary mt-3"
                    text="Create Account"
                    type="submit"
                    loading={loading}
                    fullWidth
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
