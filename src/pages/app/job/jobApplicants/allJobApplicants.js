import Card from 'components/card';
import React from 'react';
import { Link } from 'react-router-dom';
import { Routes } from 'utils';

const Applicants = () => {
  return (
    <Card className="p-4">
      <div className="">Name of the applicant</div>
      <Link to={`${Routes.jobApplicantDetails.path}/sssf`}>See details</Link>
    </Card>
  );
};

const JobApplicants = () => {
  return (
    <div className="container">
      {/* <Card>Here are some job applications.</Card> */}
      <p className="text-center display-4">Nagarro Job Applicants</p>
      <Applicants />
    </div>
  );
};

export default JobApplicants;
