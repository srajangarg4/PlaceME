import React from 'react';
// import { Badge, Button, Input } from 'components';
import { Link } from 'react-router-dom';
import { Routes } from 'utils';
import { Card, Navbar } from 'components';
import { pendingRequests } from 'assets';

const PendingRequests = ({ type, title, requestedBy, requestedOn, id }) => (
  <Card className="row rounded p-4 mt-4">
    <div className={`col-12 rounded ${type ?? ''}`}>
      <h5 className="">{title}</h5>
      <div className="my-3">
        <p className="text-muted mb-2">Requested by: {requestedBy}</p>
        <p className="text-muted">Requested on: {requestedOn}</p>
      </div>
      <Link to={Routes.updateRequestDetails.path + `/${id}`}>View Details</Link>
    </div>
  </Card>
);

const AllUpdateRequests = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        {pendingRequests.map((request) => (
          <PendingRequests {...request} key={request.id} />
        ))}
        {/* <PendingRequests />
        <PendingRequests />
        <PendingRequests /> */}
      </div>
    </div>
  );
};
export default AllUpdateRequests;
