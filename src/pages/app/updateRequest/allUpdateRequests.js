import React, { useEffect } from 'react';
import { Card, Loader, Navbar, Toast } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { addUpdateRequests } from 'actions/pendingRequests';
import { fetchAllPendingRequests } from 'middleware/updateRequests';
import { useDatabase } from 'hooks';
import PendingRequestCard from './pendingRequestCard';

const AllUpdateRequests = () => {
  const { requests, hasAlreadyFetchedRequests } = useSelector(
    (state) => state.updateRequest,
  );
  const user = useSelector((state) => state.user);
  const { loading, callDatabase, errors } = useDatabase(() =>
    fetchAllPendingRequests(user?.role),
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!hasAlreadyFetchedRequests) {
      callDatabase((data) => {
        dispatch(addUpdateRequests(data));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Toast show={!!errors} />
      <Navbar />
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-md-10">
            <Card shadow>
              <div className="card-header bg-white">
                <h4 className="text-center pt-3">Pending Requests</h4>
              </div>
              <div className="card-body mx-3">
                {loading ? (
                  <div className="d-flex justify-content-center align-items-center">
                    <Loader />
                  </div>
                ) : (
                  Object.keys(requests).map((request) => {
                    return (
                      <PendingRequestCard
                        key={request}
                        id={request}
                        {...requests[request]}
                      />
                    );
                  })
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AllUpdateRequests;
