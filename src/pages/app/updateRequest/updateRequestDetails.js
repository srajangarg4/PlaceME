import { Button } from 'components';
import Card from 'components/card';
import React from 'react';

const CurrentData = () => {
  return (
    <Card>
      <div className="px-5 py-4">
        <h4 className="text-center">Existing Data</h4>
        <hr />
        <p>Mobile number: 9602998878</p>
        <p>Mobile number: 9602998878</p>
      </div>
    </Card>
  );
};

const NewData = () => {
  return (
    <Card>
      <div className="px-5 py-4">
        <h4 className="text-center">Data to validate</h4>
        <hr />
        <p>Semester 5 Marksheet: </p>
        <p>Semester 5 Percentage: 75</p>
        <hr />
        <p className="text-muted">
          In the recent exam i have passed by maths backlog.
        </p>
      </div>
    </Card>
  );
};

const MetaData = () => {
  return (
    <Card>
      <div className="p-5">
        <p>Requested on: 18/23/2323</p>
        <p>Requested by: Ritik Bansal</p>
        <p>Category: Academic Details</p>
        <a href="/sdd">View Student Data</a>
      </div>
    </Card>
  );
};

const Header = () => {
  return (
    <Card>
      <p className="display-4 text-capitalize text-center">
        5th semester marksheet update
      </p>
    </Card>
  );
};

const ApprovalOptions = () => {
  return (
    <Card className="p-3">
      <Button
        fullWidth
        text="Verify Data"
        buttonClassName="btn btn-outline-primary"
        iconName="done"
      />
      <Button
        fullWidth
        text="Reject Update"
        buttonClassName="btn  btn-outline-danger"
        iconName="close"
      />
    </Card>
  );
};

const UpdateRequestDetails = () => {
  return (
    <div className="container">
      <Header />
      <div className="row">
        <div className="col-md-8 col-sm-12">
          <NewData />
          <CurrentData />
        </div>
        <div className="col-md-4 col-sm-12">
          <MetaData />
          <ApprovalOptions />
        </div>
      </div>
    </div>
  );
};

export default UpdateRequestDetails;
