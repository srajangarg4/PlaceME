import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { resolveDate, Routes } from 'utils';
import { Card, Navbar } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests } from 'actions/pendingRequests';
import { fetchPendingRequests } from 'middleware/updateRequests';

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
  const updateRequests = useSelector((state) => state.updateRequests);
  const user = useSelector(state => state.user);
  const { requests } = { ...updateRequests };

  const dispatch = useDispatch();

  useEffect(() => {
    fetchPendingRequests(user?.role).then(result => {
      if (result.successful) {
        dispatch(addRequests(result.result));
      }
    })
  }, [dispatch, user?.role]);

  return (
    <div>
      <Navbar />
      <div className="container">
        
        { requests?.length !==0  ? requests?.map((request) => {
          const {
            data: { requestedOn, studentEmail, title },
            id,
          } = request;
          return (
            <PendingRequests
              key={id}
              requestedOn={resolveDate(requestedOn).toLocaleDateString()}
              requestedBy={studentEmail}
              id={id}
              title={title}
            />
          );
        }) : <h4>No pending Request</h4>
        }
      </div>
    </div>
  );
};
export default AllUpdateRequests;
