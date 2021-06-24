import { Button, Card } from 'components';
import React from 'react';
import { Link } from 'react-router-dom';
import { resolveDate, Routes } from 'utils';

const PendingRequestCard = ({ type, title, studentEmail, requestedOn, id }) => (
  <Card className="row rounded p-4 mt-4">
    <div className={`col-12 rounded ${type ?? ''}`}>
      <h5 className="">{title}</h5>
      <div className="my-3">
        <p className="text-muted mb-2">Requested by: {studentEmail}</p>
        <p className="text-muted">
          Requested on: {resolveDate(requestedOn).toLocaleDateString()}
        </p>
      </div>
      <Link
        className="text-decoration-none"
        to={`${Routes.updateRequestDetail.path}${id}`}
      >
        <Button text="View Details" buttonClassName="btn btn-outline-primary" />
      </Link>
    </div>
  </Card>
);

export default PendingRequestCard;
