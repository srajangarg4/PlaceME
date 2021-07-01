import React from 'react';
import { useDatabase, useFormReducer } from 'hooks';
import { Button, Input, Card } from 'components';
import { required, Routes, validateEmail, validatePassword } from 'utils';
import { UserService } from 'placeme-services/lib';
import { useHistory } from 'react-router';
import { showError, showSuccess } from 'components/toast';

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
    <div className="d-flex justify-content-center w-100">
      <Card shadow>
        <div className="card-header">
          <h4>Login</h4>
        </div>
        <div className="card-body">
          <form
            onSubmit={handleSubmit((formData) => {
              callDatabase(
                () => {
                  showSuccess('You have successfully logged In');
                  history.push(Routes.dashboard.path);
                },
                showError,
                formData,
              );
            })}
          >
            <div className="row">
              <div className="col-12">
                {connectField('email', {
                  placeholder: 'Enter your email address',
                })(Input)}
              </div>
              <div className="col-12">
                {connectField('password', {
                  placeholder: 'Enter your password',
                  type: 'password',
                })(Input)}
              </div>
            </div>
            <Button
              text="Login"
              fullWidth
              className="btn btn-primary"
              loading={loading}
              type="submit"
            />
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Login;
