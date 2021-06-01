import React from 'react';
import { Link } from 'react-router-dom';
import { Routes } from 'utils';

const Home = () => {
  return (
    <div>
      <Link className="btn btn-primary" to={Routes.login.path}>
        Login
      </Link>
      <Link className="btn btn-primary" to={Routes.signup.path}>
        Signup
      </Link>
    </div>
  );
};

export default Home;
