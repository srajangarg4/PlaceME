import React from 'react';
import { useParams } from 'react-router';
import { companies } from 'assets/companies';
import Card from 'components/card';

const CompanyDetails = () => {
  const { id } = useParams();
  const companyDetails = companies.filter((company) => company.id === id)[0];
  if (!companyDetails) {
    return <div>Invalid company id</div>;
  }

  const { text, registeredOn } = { ...companyDetails };

  return (
    <div>
      <Card className="container p-4">
        <div className="row">
          <div className="col-sm-12 col-md-4">
            <div className="p-2 p-sm-3 mr-3 mr-sm-5">
              <img
                alt="Logo of the company"
                src="https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg"
                style={{ height: '180px' }}
                className="rounded"
              />
            </div>
          </div>
          <Card className="col-sm-12 col-md-8">
            <div>
              <h3>{companyDetails.text}</h3>
              <h4>{companyDetails.registeredOn}</h4>
            </div>
          </Card>
        </div>
        <Card className="row">
          <div className="col-12">
            <h4>Repersentaives</h4>
          </div>
        </Card>
        <Card className="row">
          <div className="col-12">
            <h4>Job Posted By the company</h4>
          </div>
        </Card>
      </Card>
    </div>
  );
};

export default CompanyDetails;
