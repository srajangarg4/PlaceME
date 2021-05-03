import React from 'react';
import { useFormReducer } from '../../hooks';
import { Input } from '../../components';
import { required, validateEmail, validatePassword } from '../../utils';

const validators = {
  email: [required('Email is required'), validateEmail],
  password: [required('Password is required'), validatePassword],
};

const Login = () => {
  const { connectField, handleSubmit } = useFormReducer(validators);
  return (
    <div className="row min-vh-100 align-items-center justify-content-center" style={{backgroundColor: "aliceblue"}}>
      <div className="col-sm-5">
        <div className="card">
          <div className="card-header" style={{ textAlign: 'center' }}>
            <h1>Login</h1>
          </div>
          <div className="card-body p-4">
            <form
              onSubmit={handleSubmit((data) => {
                console.log(data);
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
                      className: 'form-control'
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
                      className: 'form-control'
                    })(Input)}
                  </div>
                </div>
              </div>
              <div className="btn btn-primary" type="submit">Submit</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
