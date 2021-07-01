import React, { useEffect } from 'react';
import { Card, Loader, Navbar } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { addUpdateRequests } from 'actions/pendingRequests';
import { fetchAllPendingRequests } from 'middleware/updateRequests';
import { useDatabase } from 'hooks';
import PendingRequestCard from './pendingRequestCard';
import { showError } from 'components/toast';

const AllUpdateRequests = () => {
  const { requests, hasAlreadyFetchedRequests } = useSelector(
    (state) => state.updateRequest,
  );
  const user = useSelector((state) => state.user);
  const { loading, callDatabase } = useDatabase(() =>
    fetchAllPendingRequests(user?.role),
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!hasAlreadyFetchedRequests) {
      callDatabase((data) => {
        dispatch(addUpdateRequests(data));
      }, showError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
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
                  <Loader />
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
