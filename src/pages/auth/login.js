import React from 'react';
import { useDatabase, useFormReducer } from 'hooks';
import { Button, Input } from 'components';
import { required, Routes, validateEmail, validatePassword } from 'utils';
import { UserService } from 'placeme-services/lib';
import { useHistory } from 'react-router';

const validators = {
  email: [required('Email is required'), validateEmail],
  password: [required('Password is required'), validatePassword],
};

const loginUser = ({ email, password }) => {
  return UserService.loginUser(email, password);
};

const Login = () => {
  const { connectField, handleSubmit } = useFormReducer(validators);
  const { callDatabase, loading } = useDatabase(loginUser);
  const history = useHistory();
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
              onSubmit={handleSubmit((formData) => {
                callDatabase(
                  () => {
                    history.push(Routes.dashboard.path);
                  },
                  (error) => {
                    console.error(error);
                  },
                  formData,
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
                      type: 'password',
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
