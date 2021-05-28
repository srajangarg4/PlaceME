import React from 'react';
import { useDatabase, useFormReducer } from '../../hooks';
import { Button, Input } from '../../components';
import { required, validateEmail, validatePassword } from '../../utils';
import { UserService } from 'placeme-services/lib';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/user';

const validators = {
  email: [required('Email is required'), validateEmail],
  password: [required('Password is required'), validatePassword],
};

const loginUser = async ({ email, password }) => {
  const { successful, error } = await UserService.loginUser(email, password);
  if (successful) {
    return UserService.getUserDetail(email);
  }
  return { successful: false, error };
};

const Login = () => {
  const { connectField, handleSubmit } = useFormReducer(validators);
  const { callDatabase, loading } = useDatabase((email) =>
    UserService.getUserDetail(email),
  );
  const dispatch = useDispatch();
  return (
    <div
      className="row min-vh-100 align-items-center justify-content-center"
      style={{ backgroundColor: 'aliceblue' }}
    >
      <div className="col-sm-5">
        <div className="card">
          <div className="card-header" style={{ textAlign: 'center' }}>
            <h1>Login</h1>
          </div>
          <div className="card-body p-4">
            <form
              onSubmit={handleSubmit(async (formData) => {
                const { email, password } = formData;
                callDatabase(
                  (userAuthDetails) => {
                    console.log('After login successful', userAuthDetails);
                    // dispatch(login(userAuthDetails));
                  },
                  (error) => {
                    console.log(error);
                  },
                  email,
                );
              })}
            >
              <div className="form-group">
                <div className="row align-items-center">
                  <div className="col-sm-3">
                    <label>Email</label>
                  </div>
                  <div className="col-sm">
                    {connectField('email', {
                      placeholder: 'Enter your email address',
                      className: 'form-control',
                    })(Input)}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row align-items-center">
                  <div className="col-sm-3">
                    <label>Password</label>
                  </div>
                  <div className="col">
                    {connectField('password', {
                      placeholder: 'Enter your password',
                      className: 'form-control',
                    })(Input)}
                  </div>
                </div>
              </div>
              <Button
                text="Login"
                className="btn btn-primary"
                loading={loading}
                type="submit"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
