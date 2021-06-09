import { companies } from 'assets/companies';
import { Navbar } from 'components';
import Card from 'components/card';
import React from 'react';
import { Link } from 'react-router-dom';
import { Routes } from 'utils';

const CompanyCard = ({ id, value, registeredOn, onClick }) => (
  <Card className="border rounded p-4">
    <div className="row">
      <div className="col-12">
        <h5>{value}</h5>
        <p className="blockquote-footer">Registered On: {registeredOn}</p>
        <Link to={Routes.companyDetails.path + `/${id}`}>View Details</Link>
      </div>
    </div>
  </Card>
);

const Companies = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Link className="btn btn-primary mt-4" to={Routes.addCompany.path}>
          Add company
        </Link>

        {companies.map((company) => (
          <CompanyCard {...company} key={company.id} />
        ))}
      </div>
    </div>
  );
};

export default Companies;
